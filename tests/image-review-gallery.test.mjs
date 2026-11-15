import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
test('image review gallery outputs local HTML without altering article content',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'baatbaaki-review-'));
 try{
 const output=path.join(dir,'images.html');
 const result=spawnSync(process.execPath,['scripts/image-review-gallery.mjs',output],{encoding:'utf8'});
 assert.equal(result.status,0,result.stderr);
 const html=fs.readFileSync(output,'utf8');
 assert.match(html,/BaatBaaki image review/);
 assert.match(html,/india-west-indies-iyer-century\.webp/);
 assert.match(html,/Reused in/);
 assert.match(html,/No image licence or source has been verified/);
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
});
