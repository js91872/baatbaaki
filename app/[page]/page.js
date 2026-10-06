import Link from 'next/link';
import {notFound} from 'next/navigation';
import {pages} from '../../lib/pages.mjs';
export function generateStaticParams(){return Object.keys(pages).map(page=>({page}));}
export async function generateMetadata({params}){const {page}=await params;const p=pages[page];return p?{title:p.title,description:p.intro,alternates:{canonical:'/'+page}}:{};}
export default async function InfoPage({params}){const {page}=await params;const p=pages[page];if(!p)notFound();const email=process.env.CONTACT_EMAIL;return <main id="main" className="wrap inner-page"><div className="breadcrumbs"><Link href="/">होम</Link><span>/</span>{p.title}</div><article className="info-page"><div className="page-heading"><span className="eyebrow">बात बाकी</span><h1>{p.title}<span className="red-period">.</span></h1><p>{p.intro}</p></div>{p.sections.map(([title,text])=><section key={title}><h2>{title}</h2><p>{text}</p></section>)}{page==='contact'&&(email?<a className="button" href={'mailto:'+email}>{email}</a>:<p className="contact-note">संपर्क माध्यम जल्द उपलब्ध होगा।</p>)}{page==='corrections'&&<Link className="button" href="/contact">संपर्क करें</Link>}</article></main>}
