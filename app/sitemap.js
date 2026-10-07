import {getArticles,categories,siteUrl,indexable} from '../lib/content.mjs';
import {pages} from '../lib/pages.mjs';
export default function sitemap(){if(!indexable)return [];const articles=getArticles();return [{url:siteUrl+'/'},...categories.filter(c=>articles.some(a=>a.category===c.slug)).map(c=>({url:siteUrl+'/category/'+c.slug})),...Object.entries(pages).map(([slug,p])=>({url:siteUrl+'/'+slug,lastModified:p.updatedAt})),...articles.map(a=>({url:siteUrl+'/news/'+a.slug,lastModified:a.updatedAt||a.publishedAt,images:[siteUrl+a.image]}))];}
