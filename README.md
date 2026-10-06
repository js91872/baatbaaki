# BaatBaaki — बात बाकी

A Hindi newspaper-style publication for baatbaaki.com. Next.js 16.3.8 / React 19, statically generated editorial pages and server-rendered search. Black and white masthead, deep red accents, responsive newspaper columns, readable Hindi type, article contents, font controls, print and WhatsApp sharing.

## Local

Node 22 or newer:

```bash
npm ci
npm run dev
```

```bash
npm run check
npm test
npm run build
npm start
```

Default local start uses port 3010, bound to loopback. Hindi fonts are bundled locally with system fallbacks; no Google Fonts request is needed. Feature illustrations are local WebP files and labelled as symbolic AI artwork.

## Editorial content

Three starter articles are based on the approved 6 October 2026 samples. They are SHORT samples, not 1500–2000-word full features. Review current facts before public launch; admission deadlines and car launch details will change. Source URLs are included in each article. No invented live scores, breaking-news ticker, readership statistics or correspondent profiles.

Files: `content/articles/*.json`. Drafts use `"status":"draft"` and are excluded from article lookup, homepage, search, sitemap and RSS. Published records require title, excerpt, body, source URLs, dates, image and caption. Body supports plain paragraphs and `##` headings. Run `npm run check` before every publishing commit. Add images under `public/images/`; preserve the slug when updating a story. Content updates require a rebuild.

Article URLs: `/news/<slug>`. Category URLs: `/category/<slug>`. Empty categories have a truthful empty state.

## Launch settings

Copy `.env.example` to `.env.production` on the VPS and set an actual monitored `CONTACT_EMAIL`. Indexing defaults OFF to avoid indexing the starter edition before review. Set `SITE_INDEXABLE=true` ONLY once launch content, source checks and contact details are ready; rebuild afterward. No fake-success contact form, tracking, analytics or AdSense code is installed.

## VPS deployment

See [DEPLOYMENT.md](DEPLOYMENT.md). Uses standalone Node server, systemd, port 3010 and the existing Caddy reverse proxy. Does not modify other applications. Verify that port 3010 is free before using it.

## Daily automation — next phase

The content format and draft validation are ready for automated ingestion, but NO scheduler, model API calls, automated Git publisher or VPS auto-deployment has been activated. Implementation needs a chosen source feed list, model API account, cost cap and review workflow. Discover trends, verify primary sources, write drafts, validate metadata/images, commit drafts for review; only approved articles become published. Do not hard-code secrets into this repository.
