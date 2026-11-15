import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {getArticle} from '../lib/content.mjs';
const cases=[["neet-drop-year-decision-budget-study-guide","neet-drop-decision"],["neet-physics-weak-basics-numericals-plan","neet-physics-practice"],["neet-biology-ncert-diagrams-revision-guide","neet-biology-diagrams"],["pm-surya-ghar-rooftop-solar-subsidy-cost-guide","rooftop-solar-house"],["jan-dhan-account-overdraft-10000-guide","jan-dhan-banking"],["pm-vishwakarma-toolkit-training-loan-eligibility-guide","vishwakarma-artisan-tools"],["shubman-gill-208-odi-double-century-guide","cricket-batting-record-gill"],["smriti-mandhana-2024-odi-performance-guide","cricket-women-odi"],["yuvraj-singh-six-sixes-2007-over-explained","cricket-six-sixes"],["sachin-tendulkar-100-international-centuries-explained","cricket-centuries-record"]];
test('ten subject-specific images are distinct, local and accessible',()=>{
 assert.equal(cases.length,10);assert.equal(new Set(cases.map(x=>x[1])).size,10);
 for(const [slug,name] of cases){const a=getArticle(slug);assert.ok(a,slug);assert.equal(a.slug,slug);assert.equal(a.image,'/images/editorial-'+name+'.svg');assert.ok(a.imageAlt.length>20&&a.imageCaption.length>20);const file='public'+a.image;assert.ok(fs.existsSync(file));const svg=fs.readFileSync(file,'utf8');assert.match(svg,/<svg xmlns="http:\/\/www.w3.org\/2000\/svg"/);assert.doesNotMatch(svg,/<script|<foreignObject|<image |onload=|javascript:/i);}
});
