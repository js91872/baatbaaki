#!/usr/bin/env bash
# BaatBaaki: isolated build, guarded activation, and automatic rollback.
set -Eeuo pipefail

APP=/var/www/baatbaaki
SERVICE=baatbaaki
PORT=3005
LIVE="$APP/.next/standalone"
BACKUP="$APP/.next/standalone.previous"
STAGE=""
ACTIVATING=0
DEPLOYED=0

cleanup() {
  rc=$?
  trap - EXIT
  if (( ACTIVATING == 1 && DEPLOYED == 0 )); then
    echo "Deployment failed: restoring previous standalone release." >&2
    systemctl stop "$SERVICE" || true
    if [[ -d "$BACKUP" ]]; then
      rm -rf "$LIVE"
      mv "$BACKUP" "$LIVE"
      systemctl start "$SERVICE" || true
    else
      echo "WARNING: No previous release available for rollback." >&2
    fi
  fi
  if [[ -n "$STAGE" && -d "$STAGE" ]]; then rm -rf "$STAGE"; fi
  exit "$rc"
}
trap cleanup EXIT

cd "$APP"
[[ -z "$(git status --porcelain)" ]] || { echo "STOP: Uncommitted files exist." >&2; exit 1; }
[[ "$(systemctl show "$SERVICE" -p User --value)" == "www-data" ]] || {
  echo "STOP: Unexpected service user; review service configuration." >&2; exit 1;
}
[[ "$(systemctl show "$SERVICE" -p WorkingDirectory --value)" == "$LIVE" ]] || {
  echo "STOP: Service working directory changed; review deployment script." >&2; exit 1;
}
[[ -d "$LIVE" && -f "$LIVE/server.js" ]] || {
  echo "STOP: Existing release missing; cannot guarantee rollback." >&2; exit 1;
}
[[ ! -e "$BACKUP" ]] || {
  echo "STOP: Previous backup already exists at $BACKUP; review it first." >&2; exit 1;
}

git fetch origin main
if ! git merge-base --is-ancestor HEAD origin/main; then
  echo "STOP: GitHub and VPS diverged. Do not reset or force pull." >&2
  git --no-pager log --oneline --left-right HEAD...origin/main | head -30 || true
  exit 1
fi
git merge --ff-only origin/main

# Build from a clean, isolated Git snapshot. The live .next tree is untouched.
STAGE="$(mktemp -d /var/www/.baatbaaki-stage.XXXXXXXX)"
git archive HEAD | tar -x -C "$STAGE"
if [[ -f "$APP/.env.production" ]]; then
  cp -p "$APP/.env.production" "$STAGE/.env.production"
fi
(
  cd "$STAGE"
  npm ci --no-audit --no-fund
  npm run check
  npm test
  npm run build
  test -f .next/standalone/server.js
  mkdir -p .next/standalone/public .next/standalone/.next/static
  cp -a public/. .next/standalone/public/
  cp -a .next/static/. .next/standalone/.next/static/
  if [[ -d content ]]; then cp -a content .next/standalone/; fi
  mkdir -p .next/standalone/.next/cache .next/standalone/.next/server/route-cache
  chown -R www-data:www-data .next/standalone/.next/cache .next/standalone/.next/server/route-cache
  test -f .next/standalone/public/images/mudra-loan.webp
)
echo "Isolated build and tests passed. Activating release on port $PORT."

ACTIVATING=1
systemctl stop "$SERVICE"
mv "$LIVE" "$BACKUP"
mv "$STAGE/.next/standalone" "$LIVE"
systemctl start "$SERVICE"

# Verify local application, not just the public reverse proxy.
healthy=0
for attempt in 1 2 3 4 5 6 7 8 9 10; do
  if systemctl is-active --quiet "$SERVICE" &&
     curl -fsS --max-time 5 -o /dev/null "http://127.0.0.1:$PORT/" &&
     curl -fsS --max-time 5 -o /dev/null "http://127.0.0.1:$PORT/images/mudra-loan.webp"; then
    healthy=1
    break
  fi
  sleep 2
done
if (( healthy != 1 )); then
  echo "Health check failed; rolling back." >&2
  exit 1
fi
DEPLOYED=1
ACTIVATING=0
echo "Deployment healthy; previous release retained at $BACKUP."
echo "After confirming production, remove backup manually before next deployment."
