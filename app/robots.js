import {siteUrl,indexable} from '../lib/content.mjs';
export default function robots(){return {rules:{userAgent:'*',...(indexable?{allow:'/'}:{disallow:'/'})},sitemap:siteUrl+'/sitemap.xml'};}
