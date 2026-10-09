import '@fontsource-variable/noto-sans-devanagari';
import '@fontsource-variable/noto-serif-devanagari';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {siteUrl,indexable} from '../lib/content.mjs';
export const metadata={metadataBase:new URL(siteUrl),title:{default:'बात बाकी — ताज़ा हिंदी समाचार और आसान भाषा में खबरें',template:'%s | बात बाकी'},description:'भारत और दुनिया की ताज़ा हिंदी खबरें—राजनीति, बॉलीवुड, क्रिकेट, शिक्षा, नौकरी, ऑटो और कारोबार। आसान भाषा में जानें क्या हुआ और इसका आप पर क्या असर है।',robots:{index:indexable,follow:indexable,'max-image-preview':'large'},openGraph:{locale:'hi_IN',siteName:'बात बाकी',type:'website',images:[{url:'/images/baatbaaki-social.png',width:1200,height:630,alt:'BaatBaaki.com'}]},twitter:{card:'summary_large_image',images:['/images/baatbaaki-social.png']},icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}){return <html lang="hi"><body><a href="#main" className="skip-link">मुख्य सामग्री पर जाएं</a><Header/>{children}<Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'NewsMediaOrganization','@id':siteUrl+'/#organization',name:'बात बाकी',alternateName:'BaatBaaki',url:siteUrl,logo:{'@type':'ImageObject',url:siteUrl+'/favicon.svg'},description:'भारत और दुनिया की ताज़ा हिंदी खबरें और आसान जानकारी।',email:'info@baatbaaki.com'}).replace(/</g,'\\u003c')}}/></body></html>}
