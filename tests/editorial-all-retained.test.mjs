import test from 'node:test';
import assert from 'node:assert/strict';
import {getArticles} from '../lib/content.mjs';
test('retained articles meet concise metadata and opening standards',()=>{
 const errors=[];
 const published=getArticles();
 for(const a of published){
 const title=a.seoTitle||a.title;
 const lead=a.body.split(/\n\n+/)[0]||'';
 if(title.length>60)errors.push(a.slug+': title length '+title.length);
 if(a.excerpt.length>180)errors.push(a.slug+': description length '+a.excerpt.length);
 if(lead.length>500)errors.push(a.slug+': opening length '+lead.length);
 if(!a.imageCaption||/^(संपादकीय चित्र|प्रतीकात्मक चित्र)$/u.test(a.imageCaption.trim()))errors.push(a.slug+': generic caption');
 }
 assert.equal(errors.length,0,errors.join('\n'));
});
