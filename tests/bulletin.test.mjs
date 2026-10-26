import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {validateArticle} from '../scripts/validate-content.mjs';
const a=JSON.parse(fs.readFileSync('content/articles/isro-ursc-technician-driver-recruitment-2026-apply-guide.json','utf8'));
test('bulletin metadata accepts notice types and rejects unknown types and impossible deadlines',()=>{
 assert.deepEqual(validateArticle(a),[]);
 for(const b of [{type:'viral'}, {type:'recruitment',applicationDeadline:'2026-02-30'}, {type:'result',organization:''}, []]){
 assert.ok(validateArticle({...a,bulletin:b}).some(e=>e.includes('bulletin')));
 }
 assert.deepEqual(validateArticle({...a,bulletin:{type:'result'}}),[]);
});
