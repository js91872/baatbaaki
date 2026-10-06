import {siteUrl,indexable} from '../lib/content.mjs';
export default function robots(){return {rules:{userAgent:'*',allow:indexable?'/':undefined,disallow:indexable?'/search':'/'},sitemap:siteUrl+'/sitemap.xml'};}
