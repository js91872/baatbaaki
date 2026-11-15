import Link from 'next/link';
import {dateLabel} from '../lib/content.mjs';
// No named expert, accreditation, or personal location is inferred.
export default function EditorialAttribution({article}){
 return <section className="sources-box" aria-label="संपादकीय जिम्मेदारी और स्रोत">
   <h2>लेख की जिम्मेदारी और स्रोत</h2>
   <p><strong>लेखक:</strong> <Link href="/editorial-policy">बात बाकी संपादकीय टीम</Link> — स्वतंत्र हिंदी सूचना प्रकाशन की संस्थागत बाइलाइन, किसी प्रमाणित व्यक्तिगत विशेषज्ञ का दावा नहीं।</p>
   <p className="meta">प्रकाशित: <time dateTime={article.publishedAt}>{dateLabel(article.publishedAt)}</time> · आखिरी सामग्री अपडेट: <time dateTime={article.updatedAt}>{dateLabel(article.updatedAt)}</time></p>
   <p>प्राथमिक और अन्य संदर्भ स्रोत:</p>
   <ul>{article.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}</ul>
   <p>आवेदन, परिणाम और नियम की नवीनतम स्थिति मूल जारीकर्ता की वेबसाइट से जांचें।</p>
   <p><Link href="/corrections">सुधार या नई जानकारी भेजें</Link></p>
 </section>;
}
