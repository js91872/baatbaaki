#!/usr/bin/env bash
set -Eeuo pipefail
cd /var/www/baatbaaki

if [[ -n "$(git status --porcelain)" ]]; then
  echo "STOP: Uncommitted changes exist; inspect git status." >&2
  exit 1
fi
git fetch origin main
if ! git merge-base --is-ancestor HEAD origin/main; then
  echo "STOP: VPS and GitHub have diverged. Do not reset or force-pull." >&2
  git log --oneline --left-right HEAD...origin/main | head -30
  exit 1
fi
git merge --ff-only origin/main
npm run build
test -f .next/standalone/server.js
mkdir -p .next/standalone/public .next/standalone/.next/static
cp -a public/. .next/standalone/public/
cp -a .next/static/. .next/standalone/.next/static/
service_user="$(systemctl show baatbaaki -p User --value)"
[[ -n "$service_user" ]] || service_user=root
service_group="$(systemctl show baatbaaki -p Group --value)"
[[ -n "$service_group" ]] || service_group="$(id -gn "$service_user")"
mkdir -p .next/standalone/.next/cache .next/standalone/.next/server/route-cache
chown -R "$service_user:$service_group" .next/standalone/.next/cache .next/standalone/.next/server/route-cache
systemctl restart baatbaaki
systemctl is-active --quiet baatbaaki
curl -fsS --retry 3 --retry-delay 2 -o /dev/null https://baatbaaki.com/
curl -fsS --retry 3 --retry-delay 2 -o /dev/null https://baatbaaki.com/images/mudra-loan.webp
echo "Deployment complete; homepage and original image returned HTTP 200."
