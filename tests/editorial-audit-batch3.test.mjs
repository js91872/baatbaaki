import test from 'node:test';
import assert from 'node:assert/strict';
import {getArticle,getArticles,stripEditorialHashtagLines} from '../lib/content.mjs';
const slugs=["aadhaar-offline-verification-300-entities-consent-sharing-2026","nhai-mlff-barrier-free-toll-design-guidelines-november-2026","india-sri-lanka-first-odi-2026-delhi-visakhapatnam-venue-change","india-new-zealand-odi-squad-2026-auqib-nabi-update","border-gavaskar-trophy-india-vs-australia-test-history-records-winners-list-wtc-guide","epfo-uan-activation-online-pf-account-transfer-form-13-ekyc-passbook-guide-2026","ignou-december-2026-tee-exam-form-online-apply-assignment-status-hall-ticket-guide","pucc-pollution-certificate-online-download-parivahan-validity-10000-challan-rules-guide-2026","icc-world-test-championship-wtc-points-table-pct-calculation-rules-final-qualification-guide","marriage-certificate-online-apply-documents-fees-edistrict-registration-process-guide-2026","vehicle-rc-transfer-online-process-parivahan-form-29-30-documents-fees-guide-2026","national-scholarship-portal-nsp-biometric-ekyc-aadhaar-seeding-status-guide-2026","ssc-gd-constable-recruitment-online-apply-eligibility-syllabus-physical-test-guide-2026","ctet-december-2026-exam-notification-apply-online-paper-1-2-eligibility-guide","cbse-class-10-12-board-exam-date-sheet-two-exams-rule-sample-paper-guide-2027","abha-card-online-registration-download-14-digit-health-id-benefits-guide-2026","ugc-net-december-2026-exam-apply-online-jrf-eligibility-syllabus-pattern-guide","traffic-challan-online-payment-echallan-parivahan-lok-adalat-guide-2026"];
test('strip only standalone social hashtag lines, preserve headings and prose',()=>{
 const body='मूल जानकारी।\n\n## पात्रता\n\nविवरण।\n\n#BaatBaaki #GovernmentSchemes';
 assert.equal(stripEditorialHashtagLines(body),'मूल जानकारी।\n\n## पात्रता\n\nविवरण।');
 assert.equal(stripEditorialHashtagLines('पाठ में #BaatBaaki संदर्भ है।'),'पाठ में #BaatBaaki संदर्भ है।');
});
test('public article body does not expose exact promotional hashtag footer lines',()=>{
 for(const a of getArticles())assert.doesNotMatch(a.body,/^\s*#(?:BaatBaaki|GovernmentSchemes|OnlineEarning)\b/gm,a.slug);
});
test('18 editorial metadata fixes retain original canonical slugs',()=>{
 assert.equal(new Set(slugs).size,18);
 for(const slug of slugs){const a=getArticle(slug);assert.ok(a,slug);assert.ok(a.seoTitle.length<=60,slug+' title '+a.seoTitle.length);assert.ok(a.excerpt.length<=180,slug+' excerpt '+a.excerpt.length);}
});
test('caution not mistaken for coverage guarantee',()=>{
 const a=getArticle('ayushman-bharat-card-online-apply-beneficiary-nha-portal-family-member-add-hospital-list-guide-2026');
 assert.match(a.body,/हर खर्च अपने आप मुफ्त नहीं हो जाता/);
});
