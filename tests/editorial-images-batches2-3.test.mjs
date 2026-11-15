import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {getArticle} from '../lib/content.mjs';
const images=[["neet-counselling-qualifying-mbbs-seat-choice-guide","neet-counselling-choice"],["neet-mock-test-five-mistakes-score-analysis","neet-mock-analysis"],["neet-preparation-syllabus-revision-weekly-plan","neet-weekly-revision"],["pm-mudra-tarun-plus-20-lakh-loan-eligibility-guide","mudra-small-business"],["pm-kisan-payment-status-ekyc-check-guide","pm-kisan-ekyc"],["jasprit-bumrah-2024-awards-bowling-numbers-guide","cricket-fast-bowling"],["ms-dhoni-three-icc-titles-captaincy-explained","cricket-three-trophies"],["rohit-sharma-264-innings-record-reading-guide","cricket-odi-264"],["aadhaar-child-biometric-update-centre-guide-2026","aadhaar-child-update"],["classical-language-five-centres-2026-student-guide","classical-language-study"],["asian-games-2026-india-pakistan-cricket-gold","cricket-gold-context"],["india-west-indies-first-t20-2026-iyer-century","cricket-t20-century"]];
test('12 Batch 2 and 3 articles use distinct existing SVG illustrations',()=>{
 assert.equal(images.length,12);assert.equal(new Set(images.map(x=>x[1])).size,12);
 for(const [slug,name] of images){const a=getArticle(slug);assert.ok(a,slug);assert.equal(a.slug,slug);assert.equal(a.image,'/images/editorial-'+name+'.svg');assert.equal(a.imageWidth,1200);assert.equal(a.imageHeight,675);assert.ok(a.imageCaption.length>20&&a.imageAlt.length>20,slug);const file='public'+a.image;assert.ok(fs.existsSync(file),file);const svg=fs.readFileSync(file,'utf8');assert.match(svg,/<svg xmlns="http:\/\/www.w3.org\/2000\/svg"/);assert.doesNotMatch(svg,/<script|<foreignObject|<image |onload=|javascript:/i);}
});
