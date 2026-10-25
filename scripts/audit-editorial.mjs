import fs from 'node:fs';
import path from 'node:path';

// Non-blocking editorial review: flags prompt verification, never auto-unpublish.
const folder = 'content/articles';
const now = Date.now();
const maxAge = 90 * 86400000;
let warnings = 0;
let reviewed = 0;
for (const file of fs.readdirSync(folder).filter((f) => f.endsWith('.json'))) {
  const article = JSON.parse(fs.readFileSync(path.join(folder, file), 'utf8'));
  if (article.status !== 'published') continue;
  reviewed++;
  const prose = [article.title, article.excerpt, article.takeaway, article.body].join(' ');
  const flags = [];
  const published = Date.parse(article.publishedAt);
  const updated = Date.parse(article.updatedAt);
  if (Number.isFinite(published) && published > now + 86400000) flags.push('Publication date is in the future');
  if (article.expiresAt && Date.parse(article.expiresAt) < now) flags.push('Published article has expired');
  if ((article.sources || []).length === 0) flags.push('No attributed sources');
  if ((article.sources || []).every((source) => {
    try { return new URL(source.url).pathname === '/'; } catch { return true; }
  })) flags.push('Only source homepages: provide direct evidence links');
  if (/champions trophy 2026|चैंपियंस ट्रॉफी 2026/i.test(prose) &&
      !/2029|2026.{0,40}(?:नहीं|not scheduled|no tournament)/i.test(prose))
    flags.push('Check nonexistent 2026 men's Champions Trophy claims');
  if (/(?:2026|2025)/.test(prose) && Number.isFinite(updated) &&
      now - updated > maxAge &&
      /(?:ब्याज दर|interest rate|अंतिम तिथि|last date|deadline|शेड्यूल|schedule)/i.test(prose))
    flags.push('Time-sensitive facts may need re-verification');
  if (flags.length) {
    warnings += flags.length;
    console.log('REVIEW ' + file);
    flags.forEach((flag) => console.log('  - ' + flag));
  }
}
console.log('Editorial audit: ' + reviewed + ' published articles reviewed; ' + warnings + ' warnings.');
console.log('Warnings require human review; this tool never changes publication status.');
