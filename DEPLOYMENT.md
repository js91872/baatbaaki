# VPS setup — BaatBaaki.com

Use Node 22+. Confirm that port 3010 is unused (`ss -ltnp | rg ':3010'`); if occupied, choose another port and update the systemd and Caddy files together. Point the domain's A record to your VPS; set an AAAA record only if IPv6 is configured.

## First installation

Run as root on the VPS:

```bash
cd /var/www
 git clone https://github.com/js91872/baatbaaki.git
cd /var/www/baatbaaki
cp .env.example .env.production
nano .env.production
```

The public contact address is `info@baatbaaki.com`. For public launch set `CONTACT_EMAIL=info@baatbaaki.com`, `SITE_INDEXABLE=true` and `PORT=3005` in the existing environment file, then rebuild. Set `SITE_INDEXABLE=false` only for staging. These are plain environment assignments; do not insert untrusted shell commands.

```bash
cd /var/www/baatbaaki
set -a
source .env.production
set +a
npm ci --no-audit --no-fund
npm run check
npm test
npm run build
mkdir -p .next/standalone/.next
cp -a .next/static .next/standalone/.next/
cp -a public .next/standalone/
cp -a content .next/standalone/
chmod -R a+rX /var/www/baatbaaki
chmod 600 .env.production
cp deploy/baatbaaki.service /etc/systemd/system/baatbaaki.service
systemctl daemon-reload
systemctl enable --now baatbaaki
systemctl status baatbaaki --no-pager
curl -I http://127.0.0.1:3010/
```

The systemd service reads the environment as root before changing to www-data. Node must be installed at `/usr/bin/node`; if different, change ExecStart to the real absolute path from `command -v node`.

## HTTPS using existing Caddy

Append the block from `deploy/Caddyfile.example` to `/etc/caddy/Caddyfile`; preserve existing site blocks. Then:

```bash
caddy validate --config /etc/caddy/Caddyfile
systemctl reload caddy
curl -I https://baatbaaki.com/
curl -I https://www.baatbaaki.com/
```

A VPS already using nginx on ports 80/443 needs its own matching reverse-proxy server block; do not install a competing proxy blindly.

## Subsequent updates

```bash
cd /var/www/baatbaaki
bash scripts/deploy.sh
```

If the health check fails, inspect `journalctl -u baatbaaki -n 60 --no-pager`. Build succeeds before restart, but deployment is not an atomic release swap; a failed build may require rebuilding the previous known-good commit to restore standalone output. Keep the previous working commit available.

After launch, submit `/sitemap.xml` in Search Console. Check `robots.txt` and the page robots meta allow indexing. RSS is `/rss.xml`.

## Existing live VPS (October 2026)

Provider-managed external Caddy terminates HTTPS and forwards both domains directly to port 3005. Keep the systemd network drop-in with HOSTNAME=0.0.0.0 and PORT=3005. Do not run local Certbot for this route. `scripts/deploy.sh` uses PORT from .env.production for its health check. The www redirect must be configured in the provider route or application, not an unused local nginx route.
