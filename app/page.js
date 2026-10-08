import Link from 'next/link';
import Image from 'next/image';
import StoryCard from '../components/StoryCard';
import {getArticles,categories,categoryName,dateLabel,readTime,siteUrl} from '../lib/content.mjs';

export const metadata={alternates:{canonical:'/'}};

function Picture({article,sizes,priority=false}) {
  return <Image src={article.image} alt={article.imageAlt||article.title} width={article.imageWidth||1536} height={article.imageHeight||1024} sizes={sizes} quality={80} priority={priority}/>;
}
export default function Home() {
  const all=getArticles();
  const lead=all[0];
  const highlights=all.slice(1,3);
  const trending=all.slice(3,8);
  const latest=all.slice(1,13);
  return <main id="main" className="wrap homepage bb-home">
    <div className="bb-topline"><span className="bb-live-dot"/> <span>आज की खास खबरें</span><span className="bb-topline-desc">देश, मनोरंजन, क्रिकेट और आपके काम की बातें</span></div>
    <nav className="bb-topic-nav" aria-label="खबरों के विषय">{categories.map(c=><Link href={'/category/'+c.slug} key={c.slug}>{c.name}<span aria-hidden="true"> ↗</span></Link>)}</nav>
    <div className="bb-section-title"><div><span className="bb-kicker">BAATBAAKI • TOP STORIES</span><h1>आज क्या है खास?</h1></div><Link href="/search">सभी खबरें देखें <span aria-hidden="true">→</span></Link></div>
    <section className="bb-hero" aria-label="आज की मुख्य खबरें">
      {lead&&<article className="bb-lead">
        <Link className="bb-lead-image" href={'/news/'+lead.slug}><Picture article={lead} priority sizes="(max-width: 760px) 100vw, 65vw"/></Link>
        <div className="bb-lead-content"><span className="bb-category">{categoryName(lead.category)}</span><h2><Link href={'/news/'+lead.slug}>{lead.title}</Link></h2><p>{lead.excerpt}</p><span className="bb-date">{dateLabel(lead.publishedAt)} · {readTime(lead)} मिनट में पढ़ें</span></div>
      </article>}
      <div className="bb-hero-side">{highlights.map(a=><article key={a.slug} className="bb-feature"><Link href={'/news/'+a.slug} className="bb-feature-image"><Picture article={a} sizes="(max-width: 760px) 50vw, 30vw"/></Link><div className="bb-feature-copy"><span className="bb-category">{categoryName(a.category)}</span><h3><Link href={'/news/'+a.slug}>{a.title}</Link></h3><span className="bb-date">{dateLabel(a.publishedAt)}</span></div></article>)}</div>
    </section>
    {trending.length>0&&<section className="bb-trending" aria-label="लोकप्रिय खबरें"><div className="bb-trending-heading"><span className="bb-fire">●</span> चर्चा में</div><div className="bb-trending-list">{trending.map(a=><Link href={'/news/'+a.slug} key={a.slug}><span className="bb-category">{categoryName(a.category)}</span><strong>{a.title}</strong><span className="bb-arrow" aria-hidden="true">↗</span></Link>)}</div></section>}
    <section className="bb-latest" aria-label="नई खबरें"><div className="bb-section-title"><div><span className="bb-kicker">LATEST STORIES</span><h2>ताज़ा खबरें और आसान जानकारी</h2></div><Link href="/search">और पढ़ें <span aria-hidden="true">→</span></Link></div><div className="bb-article-grid">{latest.map(a=><StoryCard article={a} key={a.slug}/>)}</div></section>
    <section className="bb-explore"><div><span className="bb-kicker">खोजें और जानें</span><h2>किस विषय पर पढ़ना चाहेंगे?</h2><p>अपनी पसंद की खबरें आसानी से खोजें।</p></div><form action="/search"><label htmlFor="home-search">अपना विषय लिखें</label><div><input id="home-search" name="q" type="search" placeholder="जैसे NEET, क्रिकेट, बॉलीवुड…"/><button type="submit">खोजें →</button></div></form></section>
    <section className="bb-directory"><div className="bb-section-title"><div><span className="bb-kicker">CATEGORIES</span><h2>अपनी पसंद की खबरें</h2></div></div><div className="bb-directory-grid">{categories.map(c=><Link key={c.slug} href={'/category/'+c.slug}><strong>{c.name}</strong><span>{c.description}</span><span className="bb-dir-arrow" aria-hidden="true">↗</span></Link>)}</div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'WebSite',name:'बात बाकी',url:siteUrl,inLanguage:'hi-IN',publisher:{'@id':siteUrl+'/#organization'}}).replace(/</g,'\\u003c')}}/>
  </main>;
}