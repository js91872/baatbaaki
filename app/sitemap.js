import {getArticles,categories,siteUrl} from '../lib/content.mjs';
import {pages} from '../lib/pages.mjs';
export default function sitemap(){return [{url:siteUrl},...categories.map(c=>({url:siteUrl+'/category/'+c.slug})),...Object.keys(pages).map(p=>({url:siteUrl+'/'+p})),...getArticles().map(a=>({url:siteUrl+'/news/'+a.slug,lastModified:a.updatedAt}))];}
