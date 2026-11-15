export const escapeJsonLd = value => JSON.stringify(value).replace(/</g,'\\u003c');
export const editorialAuthor = siteUrl => ({
  '@type':'Organization',name:'बात बाकी संपादकीय टीम',url:siteUrl+'/editorial-policy'
});
export function buildArticleJsonLd(article,siteUrl,categoryName){
 const url=siteUrl+'/news/'+article.slug;
 const schema={'@context':'https://schema.org','@type':article.schemaType==='NewsArticle'?'NewsArticle':'Article',
  '@id':url+'#article',headline:article.title,description:article.excerpt,
  image:{'@type':'ImageObject',url:siteUrl+article.image,width:article.imageWidth||1536,height:article.imageHeight||1024},
  datePublished:article.publishedAt,dateModified:article.updatedAt,inLanguage:'hi-IN',
  articleSection:categoryName,mainEntityOfPage:{'@type':'WebPage','@id':url},
  author:editorialAuthor(siteUrl),
  publisher:{'@type':'Organization','@id':siteUrl+'/#organization',name:'बात बाकी',url:siteUrl}};
 return schema;
}
export function buildBreadcrumbJsonLd(article,siteUrl,categoryName){
 return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[
  {'@type':'ListItem',position:1,name:'होम',item:siteUrl+'/'},
  {'@type':'ListItem',position:2,name:categoryName,item:siteUrl+'/category/'+article.category},
  {'@type':'ListItem',position:3,name:article.title,item:siteUrl+'/news/'+article.slug}
 ]};
}
// Only mark up FAQ answers when they also appear visibly on the page.
// No FAQ schema is added to articles without actual editorial FAQs.
export function buildFaqJsonLd(faqs){
 if(!Array.isArray(faqs)||!faqs.length)return null;
 if(!faqs.every(x=>typeof x.question==='string'&&x.question.trim()&&typeof x.answer==='string'&&x.answer.trim()))return null;
 return {'@context':'https://schema.org','@type':'FAQPage',
  mainEntity:faqs.map(x=>({'@type':'Question',name:x.question,acceptedAnswer:{'@type':'Answer',text:x.answer}}))};
}
