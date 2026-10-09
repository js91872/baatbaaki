import test from 'node:test';
import assert from 'node:assert/strict';
import {getArticles,getArticle} from '../lib/content.mjs';
import {validateArticle} from '../scripts/validate-content.mjs';
test('published articles validate and resolve by slug',()=>{for(const a of getArticles()){assert.deepEqual(validateArticle(a),[]);assert.equal(getArticle(a.slug).title,a.title);}});
test('untrusted paths and unsupported source schemes rejected',()=>{const a={...getArticles()[0],slug:'../../escape',image:'/../../secret',sources:[{url:'javascript:alert(1)'}]};const errors=validateArticle(a);assert.ok(errors.includes('Invalid slug'));assert.ok(errors.includes('Invalid image path'));assert.ok(errors.includes('HTTPS source required'));});
test('unreviewed draft status is valid but unknown status rejected',()=>{assert.deepEqual(validateArticle({...getArticles()[0],status:'draft'}),[]);assert.ok(validateArticle({...getArticles()[0],status:'auto'}).includes('Invalid status'));});

test('public image fields reject AI remarks',()=>{for(const field of ['imageCaption','imageAlt']){for(const remark of ['AI-generated image','AI से बनाया गया चित्र','एआई चित्र'])assert.ok(validateArticle({...getArticles()[0],[field]:remark}).includes('AI remark in '+field));}assert.deepEqual(validateArticle({...getArticles()[0],imageCaption:'प्रतीकात्मक चित्र'}),[]);});

test('optional search titles reject empty, malformed and non-text values',()=>{const a=getArticles()[0];for(const seoTitle of ['',42,'<script>bad</script>','broken\ntitle'])assert.ok(validateArticle({...a,seoTitle}).includes('Invalid seoTitle'));assert.deepEqual(validateArticle({...a,seoTitle:'NEET की तैयारी: रिविजन और साप्ताहिक प्लान'}),[]);const legacy={...a};delete legacy.seoTitle;assert.deepEqual(validateArticle(legacy),[]);});
