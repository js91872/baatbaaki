import '@fontsource-variable/noto-sans-devanagari';
import '@fontsource-variable/noto-serif-devanagari';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {siteUrl,indexable} from '../lib/content.mjs';
export const metadata={metadataBase:new URL(siteUrl),title:{default:'बात बाकी — हिंदी खबरें और आसान एक्सप्लेनर्स',template:'%s | बात बाकी'},description:'देश-दुनिया, शिक्षा, ऑटो और कारोबार की जरूरी खबरें। समझें क्या हुआ और आपके लिए इसका क्या मतलब है।',robots:{index:indexable,follow:indexable,'max-image-preview':'large'},openGraph:{locale:'hi_IN',siteName:'बात बाकी',type:'website'},icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}){return <html lang="hi"><body><a href="#main" className="skip-link">मुख्य सामग्री पर जाएं</a><Header/>{children}<Footer/></body></html>}
