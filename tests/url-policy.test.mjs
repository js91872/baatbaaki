import test from 'node:test';
import assert from 'node:assert/strict';
import {getArticles,categories} from '../lib/content.mjs';
import {retiredSlugs,duplicateRedirects,isRetired,isRedirected,sectionFor} from '../lib/url-policy.mjs';
import sitemap from '../app/sitemap.js';

test('public articles stay within four approved verticals',()=>{
  assert.deepEqual(categories.map(c=>c.slug),['schemes','education','citizen','sports']);
  for(const a of getArticles())assert.ok(categories.some(c=>c.slug===a.category),a.slug);
});
test('retired and redirected URLs never appear in the XML sitemap',()=>{
  const urls=sitemap().map(x=>new URL(x.url).pathname);
  assert.equal(new Set(urls).size,urls.length);
  for(const slug of retiredSlugs)assert.ok(!urls.includes('/news/'+slug),slug);
  for(const slug of Object.keys(duplicateRedirects))assert.ok(!urls.includes('/news/'+slug),slug);
  for(const slug of ['auto','business','entertainment','india','cricket'])assert.ok(!urls.includes('/category/'+slug),slug);
});
test('canonical redirect destinations exist and are not retired',()=>{
  const publicSlugs=new Set(getArticles().map(a=>a.slug));
  for(const [source,target] of Object.entries(duplicateRedirects)){
    assert.notEqual(source,target);
    assert.ok(publicSlugs.has(target),target);
    assert.ok(!publicSlugs.has(source),source);
  }
});
test('historical duplicate topics are not blindly consolidated',()=>{
  const active=new Set(getArticles().map(a=>a.slug));
  assert.ok(active.has('eshram-card-registration-eligibility-update-guide'));
  assert.ok(active.has('e-shram-card-online-registration-2-lakh-benefits-apply-guide-2026'));
  assert.ok(active.has('voter-id-card-online-apply-form-6-correction-form-8-guide-2026'));
  assert.ok(active.has('voter-list-name-missing-form-6-form-8-check-guide'));
});

import fs from 'node:fs';
import path from 'node:path';
import {preservedLegacyExceptions} from '../lib/url-policy.mjs';
test('every suppressed published URL has an explicit HTTP 410 inventory entry or 301 redirect',()=>{
  const missing=[];
  for(const file of fs.readdirSync('content/articles').filter(x=>x.endsWith('.json'))){
    const a=JSON.parse(fs.readFileSync(path.join('content/articles',file),'utf8'));
    if(a.status==='published'&&isRetired(a)&&!retiredSlugs.has(a.slug)&&!isRedirected(a.slug))missing.push(a.slug);
  }
  assert.deepEqual(missing,[], 'Add an explicit retired slug or citizen-service exception');
});
