// Local review contact sheet. No images are changed, and no rights are inferred.
import fs from 'node:fs';
import path from 'node:path';
import {getArticles,siteUrl} from '../lib/content.mjs';
const esc = value => String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const articles=getArticles();
const byImage=new Map();
for(const a of articles){const used=byImage.get(a.image)||[];used.push(a);byImage.set(a.image,used)}
const generic=a=>!a.imageCaption || /^(संपादकीय चित्र|प्रतीकात्मक चित्र)$/u.test(a.imageCaption.trim());
const candidates=articles.filter(a=>generic(a)||byImage.get(a.image).length>1);
const rows=candidates.map(a=>{
 const used=byImage.get(a.image);
 const warnings=[generic(a)?'Generic caption':null,used.length>1?'Reused in '+used.length+' articles':null].filter(Boolean);
 const fields=[['Review',warnings.join('; ')],['Slug',a.slug],['Alt',a.imageAlt],['Caption',a.imageCaption],['Image',a.image],['Other uses',used.map(x=>x.slug).join(', ')],['Verify','Subject match, photo vs illustration, image source, usage rights, accurate context and caption.']];
 return '<article><img loading="lazy" src="'+esc(siteUrl+a.image)+'" alt="'+esc(a.imageAlt)+'"><div><h2>'+esc(a.title)+'</h2>'+fields.map(f=>'<p><b>'+esc(f[0])+':</b> '+esc(f[1])+'</p>').join('')+'</div></article>';
}).join('\n');
const html='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>BaatBaaki image review</title><style>body{font:16px system-ui;max-width:1250px;margin:auto;padding:24px;background:#f7f7f7;color:#222}article{display:grid;grid-template-columns:minmax(200px,360px) 1fr;gap:20px;background:#fff;margin:14px 0;padding:16px;border:1px solid #ddd;border-radius:12px}img{width:100%;aspect-ratio:16/9;object-fit:contain;background:#eee}h2{font-size:19px;margin:0}p{overflow-wrap:anywhere}@media(max-width:700px){article{grid-template-columns:1fr}}</style></head><body><h1>BaatBaaki image review — '+candidates.length+' article associations</h1><p>Review-only. Images load from the public website when the file is opened with internet access. No image licence or source has been verified by this tool.</p>'+rows+'</body></html>';
const output=process.argv[2]||'/tmp/baatbaaki-image-review.html';
fs.mkdirSync(path.dirname(output),{recursive:true});
fs.writeFileSync(output,html,'utf8');
console.log('Wrote '+output+'; '+candidates.length+' article-image associations ('+articles.filter(generic).length+' generic captions; '+[...byImage.values()].filter(x=>x.length>1).length+' reused images)');
