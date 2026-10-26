import fs from 'node:fs';
import path from 'node:path';

// Non-destructive pre-publication review. Flags are leads, not policy verdicts.
// Run: node scripts/audit-editorial.mjs
const folder = 'content/articles';
const entries = fs.readdirSync(folder).filter(f => f.endsWith('.json'));
const today = Date.now();
const report = [];
const images = new Map();
let published = 0;
for (const file of entries) {
  const article = JSON.parse(fs.readFileSync(path.join(folder, file), 'utf8'));
  if (article.status !== 'published') continue;
  published++;
  const flags = [];
  const strings = [article.title, article.seoTitle, article.excerpt, article.takeaway, article.body, article.imageAlt, article.imageCaption].filter(Boolean);
  const prose = strings.join(' ');
  const raw = strings.join(' ');
  if (/à¤|à¥|â€™|Ã¢|â€œ|â€/.test(raw)) flags.push('CRITICAL: probable garbled text / encoding');
  if (/Champions Trophy 2026|चैंपियंस ट्रॉफी 2026/i.test(prose) &&
      !/2029|2026.{0,45}(?:नहीं|not scheduled|no tournament)/i.test(prose))
    flags.push('HIGH: review nonexistent Champions Trophy 2026 assertions');
  const sources = Array.isArray(article.sources) ? article.sources : [];
  if (!sources.length) flags.push('HIGH: missing sources');
  else if (sources.every(s => {
    try { const u = new URL(s.url); return u.pathname === '/' || u.pathname === ''; }
    catch { return true; }
  })) flags.push('SOURCE: only generic homepages cited');
  const publishedAt = Date.parse(article.publishedAt);
  const updatedAt = Date.parse(article.updatedAt);
  if (Number.isFinite(publishedAt) && publishedAt > today + 86400000) flags.push('HIGH: future publication date');
  if (article.expiresAt && Date.parse(article.expiresAt) < today) {
    const isArchive = /पुरानी|बीत चुकी|समाप्त|archive|past deadline|पुराना/i.test(prose);
    if (!isArchive) flags.push('HIGH: expired without clear archive notice');
  }
  if (Number.isFinite(updatedAt) && today - updatedAt > 90 * 86400000 &&
      /ब्याज दर|interest rate|अंतिम तिथि|last date|deadline|शेड्यूल|schedule/i.test(prose))
    flags.push('FRESHNESS: time-sensitive figures may need review');
  if ((article.body || '').length < 700) flags.push('DEPTH: short article, assess unique value');
  if (article.image) {
    const list = images.get(article.image) || [];
    list.push(article.slug);
    images.set(article.image, list);
  }
  if (flags.length) report.push({file, slug: article.slug, flags});
}
for (const x of report) {
  console.log('REVIEW ' + x.file);
  for (const flag of x.flags) console.log('  - ' + flag);
}
const count = report.reduce((n, x) => n + x.flags.length, 0);
console.log('Editorial audit: ' + published + ' published; ' + report.length + ' flagged articles; ' + count + ' warnings.');
const shared = [...images.entries()].filter(([, slugs]) => slugs.length >= 5).sort((a,b) => b[1].length-a[1].length);
console.log('Repeated featured images (5+ uses):');
for (const [img, slugs] of shared) console.log('  ' + img + ': ' + slugs.length + ' articles');
console.log('No files or publication statuses modified.');
if (process.argv.includes('--json')) fs.writeFileSync('/tmp/baatbaaki-editorial-review.json', JSON.stringify({published, report, repeatedImages: shared}, null, 2));
