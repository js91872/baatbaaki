# Archive editorial refresh — 18 October 2026

Scope: all 144 existing article JSON files. Article filenames, slugs, canonical paths, publication dates, categories and publication status are preserved.

- Applied a plain-Hindi language pass, simplifying formal phrasing and unnecessary English where appropriate. This is an archive-wide editorial pass, not a complete rewrite or comprehensive fact audit of every sentence.
- Added 3–5 relevant end hashtags and at least two distinct existing related-article links per article (328 link occurrences).
- Corrected reviewed claims in e-Shram, Instant e-PAN, PMAY and CIBIL guides; updated selected stale deadline, Nobel, HDFC results and birthday references. Original publication dates remain unchanged; updatedAt records this revision.
- Added six licensed real file photographs with source, date/model context, visible source-list credit and license links. See archive-photo-credits.json. Remaining illustrations are retained where a suitable licensed replacement was not established.
- Replaced the undecodable legacy railway recruitment feature reference with an existing working railway illustration. Corrected image dimension metadata to match decoded files.
- No application, design, route or deployment configuration changes.

Validation completed locally: repository content validator; all five repository tests; production build; all 144 production article responses; canonical and Article/NewsArticle schema assertions; unchanged datePublished; all article entries in sitemap/RSS; internal target existence and rendered links; decoding all 119 referenced image assets; optimization of six new photographs; visible credit/license links; absence of public feature captions.

Deployment is separate. Run scripts/deploy-vps.sh after a clean fast-forward pull on the VPS. No VPS deployment was performed as part of this revision.
