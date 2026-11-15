import test from 'node:test';
import assert from 'node:assert/strict';
import {getArticle} from '../lib/content.mjs';
const slugs=[
 'ayushman-bharat-card-online-apply-beneficiary-nha-portal-family-member-add-hospital-list-guide-2026',
 'voter-id-card-online-apply-form-6-correction-form-8-guide-2026'
];
test('verified high-risk guides keep canonical URLs and direct, short answers',()=>{
 for(const slug of slugs){const a=getArticle(slug);assert.ok(a,slug);assert.ok(a.seoTitle.length<=60);assert.ok(a.excerpt.length<=180);assert.match(a.body.slice(0,350),/[\u0900-\u097f]/);assert.ok(a.sources.length>=2);assert.ok(a.imageCaption.length>25);}
});
test('Ayushman article does not guarantee unlimited or instant treatment',()=>{
 const a=getArticle(slugs[0]);assert.match(a.body,/₹5 लाख/);
 assert.match(a.body,/https:\/\/beneficiary\.nha\.gov\.in/);
 assert.doesNotMatch(a.body,/हर पुरानी बीमारी का इलाज मुफ्त|5 मिनट में ई-केवाईसी|तुरंत.*कार्ड पीडीएफ/);
});
test('voter registration article avoids guaranteed approval dates',()=>{
 const a=getArticle(slugs[1]);assert.match(a.body,/Form 6/);assert.match(a.body,/Form 8/);
 assert.match(a.body,/https:\/\/voters\.eci\.gov\.in/);
 assert.doesNotMatch(a.body,/15 से 30 दिनों में .*स्वीकृत|पूरी तरह डिजिटल और पारदर्शी बना दिया/);
});
