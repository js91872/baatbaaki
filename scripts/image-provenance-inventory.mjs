// Editorial review inventory — never infers copyright or provenance from filenames.
import fs from 'node:fs';
import path from 'node:path';
import {getArticles} from '../lib/content.mjs';
const articles=getArticles();
const reuse=new Map();
for(const a of articles){if(!reuse.has(a.image))reuse.set(a.image,[]);reuse.get(a.image).push(a.slug);}
const flagged=articles.filter(a=>!a.imageCaption||/^(संपादकीय चित्र|प्रतीकात्मक चित्र)$/u.test(a.imageCaption.trim()));
const rows=flagged.map(a=>({slug:a.slug,title:a.title,image:a.image,imageAlt:a.imageAlt,imageCaption:a.imageCaption,reusedBy:reuse.get(a.image).length,imageExists:fs.existsSync(path.join('public',a.image)),review:'VERIFY VISUAL CONTENT, RIGHTS AND CAPTION'}));
const result={totalRetained:articles.length,genericCaptionCount:rows.length,rows};
if(process.argv.includes('--json'))console.log(JSON.stringify(result,null,2));else{
 console.log('Image caption provenance review:',rows.length,'of',articles.length,'retained articles');
 for(const a of rows)console.log([a.slug,a.image,'used by '+a.reusedBy,a.imageExists?'asset found':'MISSING ASSET'].join(' | '));
}
