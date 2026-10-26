# Automatic article push

REST credentials are different from the public browser SDK key. Retrieve the site-specific API Key and Authentication Token from Webpushr > Integration > API Keys. Never commit them or put them in NEXT_PUBLIC variables. Store only in /etc/baatbaaki-webpushr.env, root-owned mode 600. No credentials supplied and no live campaign sent during implementation.

After pulling this commit and deploying normally:

```bash
install -m 600 /dev/null /etc/baatbaaki-webpushr.env
nano /etc/baatbaaki-webpushr.env
```

Enter locally on VPS:

```dotenv
WEBPUSHR_ENABLED=true
WEBPUSHR_API_KEY=YOUR_REST_API_KEY
WEBPUSHR_AUTH_TOKEN=YOUR_AUTHENTICATION_TOKEN
```

Initialize once, skipping all currently deployed articles, then preview and enable:

```bash
cd /var/www/baatbaaki
node scripts/webpushr.mjs --init
node --env-file=/etc/baatbaaki-webpushr.env scripts/webpushr.mjs --dry-run
install -m 644 deploy/baatbaaki-webpushr.service /etc/systemd/system/
install -m 644 deploy/baatbaaki-webpushr.timer /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now baatbaaki-webpushr.timer
systemctl list-timers baatbaaki-webpushr.timer
```

Only NEW published slugs in live standalone content are eligible. Title edits do not resend. One campaign maximum per five-minute run; all subscribers receive it. Public HTTPS article must return 200 and match title/canonical URL before sending. No image/icon supplied; dashboard defaults apply. State survives builds in /var/lib/baatbaaki-webpushr/state.json. First initialization deliberately does not broadcast the archive. --init refuses to overwrite existing state.

Pending-review means the API outcome may be ambiguous. Check dashboard before manually removing that slug's record; removal can duplicate a campaign. Never delete the whole state file. A crash may leave lock directory; check that worker is stopped before removing only /var/lib/baatbaaki-webpushr/lock. Errors fail closed without printing credentials/API responses. API campaign acceptance is not proof of subscriber delivery.

Pause: systemctl stop baatbaaki-webpushr.timer. Logs: journalctl -u baatbaaki-webpushr.service -n 30 --no-pager. Deployment is still manual; timer does not deploy or fetch GitHub. Remove any overlapping Webpushr RSS auto-send rule to prevent campaigns from two independent systems.

Official reference: https://www.webpushr.com/docs/send-push-to-all-subscribers
