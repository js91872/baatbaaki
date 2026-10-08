# BaatBaaki article batch — 8 October 2026

Prepared 20 original Hindi evergreen articles: six film guides, four cricket record explainers, four practical earning guides, three government scheme explainers and three NEET study/decision guides. Each article contains 1,500–1,617 whitespace-separated words; total 31,137 words. Official sources distinguish verified historical facts from editorial interpretation and proposed practice methods. No release rumours, invented quotations, guaranteed earnings or partisan appeals were added.

Each article has a distinctive generated editorial feature illustration saved as a 1536 × 864 WebP. All 20 were reviewed together for subject relevance and visible labels; there are no text overlays, watermarks or public image labels. Image prompts are recorded in `feature-images-2026-10-08.json`.

## Validation completed

- `npm run check`: all 56 published articles valid.
- `npm test`: four tests passed, zero failures.
- `npm run build`: production build passed, 77 generated pages.
- All 20 new article pages returned HTTP 200 from the production standalone server.
- All 20 feature assets returned HTTP 200 as WebP; Sharp confirmed 1536 × 864 dimensions.
- A rendered Next.js optimized hero image returned HTTP 200.
- All 20 pages have matching Hindi headings, exact canonical URLs, Open Graph dimensions, Article schema, publication dates, source links and `max-image-preview:large`.
- Sitemap contains 71 URLs, including all 20 additions; RSS contains 56 items, including all 20 additions.
- All 19 distinct inline article links return HTTP 200; all six categories render articles.
- `www` redirect preserves path and query and returns HTTP 308.
- No public image labels or `प्रतीकात्मक चित्र` text on the new pages.
- Existing main changes at `ab5c1f077c88817fa48963e2be0e1d1888fa4c0e` retained.

These are local production checks, not a statement that the VPS has been deployed or that Google Discover placement is guaranteed. No VPS deployment was performed.

Deployment command:

```bash
cd /var/www/baatbaaki && bash scripts/deploy.sh
```
