import fs from 'node:fs';
import path from 'node:path';
export const categories = [{slug:'india',name:'देश-दुनिया',description:'बड़े बदलाव और आम लोगों पर उनका असर।'},{slug:'education',name:'शिक्षा और नौकरी',description:'प्रवेश, परीक्षा और करियर की जरूरी जानकारी।'},{slug:'auto',name:'ऑटो',description:'कार, बाइक और EV की खबरें, आसान भाषा में।'},{slug:'cricket',name:'क्रिकेट',description:'क्रिकेट की खबरें और खेल को समझने की बातें।'},{slug:'entertainment',name:'मनोरंजन',description:'फिल्मों और मनोरंजन की अहम खबरें।'},{slug:'business',name:'पैसा और कारोबार',description:'कारोबार की खबरों का आसान अर्थ।'}];
export function getArticles(){return fs.readdirSync(path.join(process.cwd(),'content/articles')).filter(f=>f.endsWith('.json')).map(f=>JSON.parse(fs.readFileSync(path.join(process.cwd(),'content/articles',f),'utf8'))).filter(a=>a.status==='published').sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt));}
export function getArticle(slug){return getArticles().find(a=>a.slug===slug);}
export const siteUrl=(process.env.SITE_URL||'https://baatbaaki.com').replace(/\/$/,'');
export const indexable=process.env.SITE_INDEXABLE!=='false';
export function dateLabel(date){return new Intl.DateTimeFormat('hi-IN',{day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Kolkata'}).format(new Date(date));}
export function readTime(article){return Math.max(2,Math.ceil(article.body.split(/\s+/).length/180));}
export function categoryName(slug){return categories.find(c=>c.slug===slug)?.name||'खबर';}

export const contactEmail=process.env.CONTACT_EMAIL?.trim()||'info@baatbaaki.com';
