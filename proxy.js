import {NextResponse} from 'next/server';
import {retiredSlugs} from './lib/url-policy.mjs';

// Next.js 16 Proxy: send a real 410 response for URLs deliberately retired from the site.
export function proxy(request) {
  const path = request.nextUrl.pathname;
  const article = /^\/news\/([a-z0-9-]+)\/?$/.exec(path);
  const retiredCategory = /^\/category\/(auto|entertainment|business)\/?$/.test(path);
  if ((article && retiredSlugs.has(article[1])) || retiredCategory) {
    return new Response('यह पृष्ठ स्थायी रूप से हटाया गया है।', {
      status: 410,
      headers: {'Content-Type':'text/plain; charset=utf-8','X-Robots-Tag':'noindex'}
    });
  }
  return NextResponse.next();
}

export const config = {matcher:['/news/:path*','/category/:path*']};
