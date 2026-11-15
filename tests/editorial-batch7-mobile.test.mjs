import test from 'node:test';
import assert from 'node:assert/strict';
import {getArticle} from '../lib/content.mjs';
const slugs=["government-jobs-after-12th-science-options-guide","ignou-july-2026-admission-last-date","police-verification-for-government-job-process-guide","khelo-india-sports-goods-manufacturing-scheme-2026","pm-viksit-gram-swaraj-yojana-2026-panchayat-planning","aadhaar-card-document-update-online-free-myaadhaar-portal-poi-poa-guide-2026","rishabh-pant-test-century-comeback-wtc-records-ipl-auction-career-guide","jeevan-pramaan-patra-digital-life-certificate-face-auth-app-pension-submission-guide-2026"];
test('Batch 7: eight retained articles have concise factual Hindi metadata and canonical IDs',()=>{
 for(const slug of slugs){const a=getArticle(slug);assert.ok(a,slug);assert.equal(a.slug,slug);assert.ok(a.seoTitle.length<=60,slug+' title '+a.seoTitle.length);assert.match(a.seoTitle,/[\u0900-\u097f]/);assert.ok(a.excerpt.length<=180,slug+' desc '+a.excerpt.length);assert.ok(a.sources.length>0,slug);}
});
test('Batch 7: high priority YMYL and sports openings give direct cautious answers',()=>{
 for(const slug of slugs.slice(-2)){const a=getArticle(slug);const lead=a.body.split(/\n\n+/)[0];assert.ok(lead.length<500,slug);assert.doesNotMatch(lead,/गारंटी|तुरंत जमा हो जाता|बिना रुके जारी रहती/);}
});
