// Non-blocking editorial audit: flags candidates for human review; never automatically prunes URLs.
import fs from 'node:fs';
import path from 'node:path';
import {getArticles} from '../lib/content.mjs';
const reviewed=getArticles();
const findings=[];
const patterns=[
 ['approval-guarantee',/(?:गारंटी मिलती है|हर .*मुफ्त.*हो जाता|तुरंत .*स्वीकृत|15 से 30 दिनों में.*स्वीकृत)/i],
 ['suspicious-absolute',/(?:किसी (?:भी|सीएससी) .*जाने की जरूरत नहीं|हर .*आवेदक .*मंजूर|100%.*(?:मिलेगा|मंजूर))/i],
 ['promotional-artifacts',/(?:#OnlineEarning|#BaatBaaki|#GovernmentSchemes)/i],
];
for(const a of reviewed){
 const checks=[];
 if((a.seoTitle||a.title).length>60)checks.push('long-mobile-title');
 if(a.excerpt.length>180)checks.push('long-description');
 const lead=a.body.split(/\n\n+/)[0]||'';
 if(lead.length>500)checks.push('long-opening');
 if(!a.imageCaption||/^(संपादकीय चित्र|प्रतीकात्मक चित्र)$/u.test(a.imageCaption.trim()))checks.push('generic-image-caption-review');
 for(const [name,rx] of patterns){
  if(name==='approval-guarantee'){
   const sentences=a.body.split(/[।\n]+/).map(x=>x.trim()).filter(Boolean);
   if(sentences.some(sentence=>rx.test(sentence)&&!/नहीं|मत मानें|गारंटी नहीं|बिना पुष्टि/i.test(sentence)))checks.push(name);
  }else if(rx.test(a.body))checks.push(name);
 }
 if(checks.length)findings.push({slug:a.slug,checks});
}
const typeCounts=Object.fromEntries([...new Set(findings.flatMap(x=>x.checks))].sort().map(t=>[t,findings.filter(x=>x.checks.includes(t)).length]));
const report={auditedPublishedArticles:reviewed.length,flaggedArticles:findings.length,counts:typeCounts,findings};
if(process.argv.includes('--json'))console.log(JSON.stringify(report,null,2));
else {
 console.log('Retained published articles audited:',reviewed.length,'| flagged:',findings.length);
 console.log('Issue counts:',typeCounts);
 for(const row of findings)console.log(row.slug+': '+row.checks.join(', '));
}
// This is informational: content decisions require source checks and editorial judgment.
