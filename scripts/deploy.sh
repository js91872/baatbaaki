#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
  echo 'Tracked local changes found. Commit or stash them before deployment.' >&2
  exit 1
fi
git pull --ff-only origin main
npm ci --no-audit --no-fund
if [[ -f .env.production ]]; then
  set -a
  source .env.production
  set +a
fi
npm run check
npm test
npm run build
mkdir -p .next/standalone/.next
cp -a .next/static .next/standalone/.next/
cp -a public .next/standalone/
cp -a content .next/standalone/
systemctl restart baatbaaki
if ! systemctl is-active --quiet baatbaaki; then
  echo 'ERROR: baatbaaki service is not active after restart' >&2
  systemctl status baatbaaki --no-pager || true
  exit 1
fi
# The production site is routed through Caddy; the systemd unit may expose a
# different internal port. Check the actual public endpoint instead of assuming
# a listening loopback port and falsely reporting success.
if ! curl --fail --silent --show-error --location \
    --retry 8 --retry-all-errors --retry-delay 2 \
    --max-time 20 --output /dev/null \
    "https://baatbaaki.com/?deploy_check=$(git rev-parse --short HEAD)"; then
  echo 'ERROR: Public website health check failed' >&2
  exit 1
fi
echo 'BaatBaaki deployment complete; systemd active and public HTTP health check passed.'
