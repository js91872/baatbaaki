import fs from 'node:fs';
import path from 'node:path';

// Editorial review helper. This is intentionally non-blocking: a warning is a
// request for human fact checking, not a verdict about an article.
const dir = 'content/articles';
let warnings = 0;
for (const name of fs.readdirSync(dir).filter((f) => f.endsWith('.json'))) {
  const a = JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'));
  if (a.status !== 'published') continue;
  const text = [a.title, a.excerpt, a.takeaway, a.body].join(' ');
  const flags = [];
  if (/champions trophy 2026|चैंपियंस ट्रॉफी 2026/i.test(text) &&
      !/2026.{0,35}(?:नहीं|न होगी|नहीं होगी|not scheduled|no tournament)|2029/i.test(text)) {
    flags.push('Verify Champions Trophy year against official ICC calendar');
  }
  if ((a.sources || []).every((s) => {
    try { return new URL(s.url).pathname === '/'; } catch { return true; }
  })) flags.push('Only generic homepages cited; add direct supporting source URLs');
  if (flags.length) {
    warnings += flags.length;
    console.log(name + ': ' + flags.join('; '));
  }
}
console.log('Editorial warnings: ' + warnings);
