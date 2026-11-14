import Script from "next/script";
import '@fontsource-variable/noto-sans-devanagari';
import '@fontsource-variable/noto-serif-devanagari';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {siteUrl,indexable} from '../lib/content.mjs';
export const metadata={metadataBase:new URL(siteUrl),other:{'kadam-verification':'kadame7ab3712a685c8e65c98aa5d5d57d5de','google-adsense-account':'ca-pub-9025398782962067'},title:{default:'बात बाकी — सरकारी योजनाएं, नागरिक सेवाएं, शिक्षा और खेल',template:'%s | बात बाकी'},description:'सरकारी योजनाओं, परीक्षा और सरकारी नौकरी, आधार और नागरिक सेवाओं तथा क्रिकेट और भारतीय खेलों की भरोसेमंद हिंदी जानकारी।',robots:{index:indexable,follow:indexable,'max-image-preview':'large'},openGraph:{locale:'hi_IN',siteName:'बात बाकी',type:'website',images:[{url:'/images/baatbaaki-social.png',width:1200,height:630,alt:'BaatBaaki.com'}]},twitter:{card:'summary_large_image',images:['/images/baatbaaki-social.png']},icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}){return <html lang="hi"><body>

      <Script
        strategy="beforeInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9025398782962067"
        crossOrigin="anonymous"
      />

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-89X6WLG9JK"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-89X6WLG9JK');
          `,
        }}
      />
<a href="#main" className="skip-link">मुख्य सामग्री पर जाएं</a><Header/>{children}<Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'NewsMediaOrganization','@id':siteUrl+'/#organization',name:'बात बाकी',alternateName:'BaatBaaki',url:siteUrl,logo:{'@type':'ImageObject',url:siteUrl+'/favicon.svg'},description:'सरकारी योजनाओं, शिक्षा, नागरिक सेवाओं और भारतीय खेलों की हिंदी जानकारी।',email:'info@baatbaaki.com'}).replace(/</g,'\\u003c')}}/>
<Script
  id="webpushr-setup"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `(function(w,d,s,id){if(typeof w.webpushr!=="undefined")return;w.webpushr=w.webpushr||function(){(w.webpushr.q=w.webpushr.q||[]).push(arguments)};var js,fjs=d.getElementsByTagName(s)[0];js=d.createElement(s);js.id=id;js.async=1;js.src="https://cdn.webpushr.com/app.min.js";fjs.parentNode.appendChild(js)})(window,document,"script","webpushr-jssdk");webpushr("setup",{key:"BGHHqXt4qiHsPEMEog1OvLRnQrRWZELfBPhRiiuokpyd5Ni_QhDwPFu7vsdp14DvFICCK2GP6Cb9d7p2nStuy6Y"})`,
  }}
/>
</body></html>}
