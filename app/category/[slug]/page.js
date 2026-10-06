import {notFound} from 'next/navigation';
import Link from 'next/link';
import StoryCard from '../../../components/StoryCard';
import {categories,getArticles} from '../../../lib/content.mjs';
export function generateStaticParams(){return categories.map(c=>({slug:c.slug}));}
export async function generateMetadata({params}){const {slug}=await params;const c=categories.find(c=>c.slug===slug);return c?{title:c.name,description:c.description,alternates:{canonical:'/category/'+slug}}:{};}
export default async function Category({params}){const {slug}=await params;const c=categories.find(c=>c.slug===slug);if(!c)notFound();const articles=getArticles().filter(a=>a.category===slug);return <main id="main" className="wrap inner-page"><div className="breadcrumbs"><Link href="/">होम</Link><span>/</span>{c.name}</div><div className="page-heading"><span className="eyebrow">बात बाकी</span><h1>{c.name}<span className="red-period">.</span></h1><p>{c.description}</p></div>{articles.length?<div className="category-grid">{articles.map(a=><StoryCard article={a} key={a.slug}/>)}</div>:<div className="empty-state"><h2>इस विषय पर लेख जल्द आएंगे।</h2><p>तब तक देश, शिक्षा, ऑटो और कारोबार के प्रकाशित लेख पढ़ें।</p><Link className="button" href="/">जरूरी खबरें पढ़ें</Link></div>}</main>}
