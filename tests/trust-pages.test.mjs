import test from 'node:test';
import assert from 'node:assert/strict';
import {pages} from '../lib/pages.mjs';
import {getArticles} from '../lib/content.mjs';
import {buildArticleJsonLd,buildBreadcrumbJsonLd,buildFaqJsonLd,escapeJsonLd} from '../lib/article-schema.mjs';
import sitemap from '../app/sitemap.js';

test('five trust routes are bilingual and independently disclose government affiliation',()=>{
 for(const slug of ['about','contact','editorial-policy','privacy-policy','disclaimer']){
  const p=pages[slug];assert.ok(p,slug);
  assert.equal(p.updatedAt,'2026-11-15');
  assert.ok(p.sections.length>=4 && p.english.length>=3,slug);
  assert.ok(p.english.every(x=>x[0]&&x[1]),slug);
 }
 assert.ok(!Object.hasOwn(pages,'privacy'));
 assert.match(pages.about.sections.map(x=>x[1]).join(' '),/किसी मंत्रालय/);
});
test('privacy policy reflects the installed services without inventing AdSense approval',()=>{
 const p=pages['privacy-policy'].sections.map(x=>x[1]).join(' ');
 for(const s of ['Google Analytics','AdSense','Webpushr','कुकी','info@baatbaaki.com'])assert.ok(p.includes(s),s);
 assert.ok(p.includes('स्वीकृति'));
});
test('sitemap has only canonical privacy trust route',()=>{
 const urls=sitemap().map(x=>new URL(x.url).pathname);
 assert.ok(urls.includes('/privacy-policy'));
 assert.ok(!urls.includes('/privacy'));
});
test('structured data reflects visible article and institutional attribution',()=>{
 const a=getArticles()[0],root='https://baatbaaki.com';
 const article=buildArticleJsonLd(a,root,'नागरिक सेवाएं');
 assert.equal(article.author['@type'],'Organization');
 assert.equal(article.author.name,'बात बाकी संपादकीय टीम');
 assert.equal(article.mainEntityOfPage['@id'],root+'/news/'+a.slug);
 assert.equal(article.dateModified,a.updatedAt);
 assert.ok(['Article','NewsArticle'].includes(article['@type']));
 const crumb=buildBreadcrumbJsonLd(a,root,'नागरिक सेवाएं');
 assert.equal(crumb.itemListElement.length,3);
 assert.ok(crumb.itemListElement[2].item.endsWith(a.slug));
});
test('FAQ schema only represents actual visible valid questions and answers',()=>{
 assert.equal(buildFaqJsonLd(undefined),null);
 assert.equal(buildFaqJsonLd([{question:'',answer:'yes'}]),null);
 const faqs=[{question:'पात्रता क्या है?',answer:'मूल अधिसूचना देखें।'}];
 const result=buildFaqJsonLd(faqs);
 assert.equal(result.mainEntity[0].acceptedAnswer.text,faqs[0].answer);
 assert.ok(escapeJsonLd({value:'<script>'}).includes('\\u003cscript>'));
});
