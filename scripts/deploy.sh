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
curl --fail --silent --show-error --retry 8 --retry-connrefused --retry-delay 2 http://127.0.0.1:3010/ -o /dev/null
echo 'BaatBaaki deployment complete; local health check passed.'
