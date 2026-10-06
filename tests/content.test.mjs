import test from 'node:test';
import assert from 'node:assert/strict';
import {getArticles,getArticle} from '../lib/content.mjs';
import {validateArticle} from '../scripts/validate-content.mjs';
test('published articles validate and resolve by slug',()=>{for(const a of getArticles()){assert.deepEqual(validateArticle(a),[]);assert.equal(getArticle(a.slug).title,a.title);}});
test('untrusted paths and unsupported source schemes rejected',()=>{const a={...getArticles()[0],slug:'../../escape',image:'/../../secret',sources:[{url:'javascript:alert(1)'}]};const errors=validateArticle(a);assert.ok(errors.includes('Invalid slug'));assert.ok(errors.includes('Invalid image path'));assert.ok(errors.includes('HTTPS source required'));});
test('unreviewed draft status is valid but unknown status rejected',()=>{assert.deepEqual(validateArticle({...getArticles()[0],status:'draft'}),[]);assert.ok(validateArticle({...getArticles()[0],status:'auto'}).includes('Invalid status'));});
