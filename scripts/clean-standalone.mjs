import fs from 'node:fs';
// Next's traced-file copier may preserve an existing standalone tree.
// Remove only generated standalone output before the next production build.
fs.rmSync('.next/standalone',{recursive:true,force:true});
