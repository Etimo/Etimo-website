import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIES, LANG } from '@/app/lib/constants';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip for static files etc.
  if (pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next();
  }

  const langCookie = request.cookies.get(COOKIES.PREFERRED_LANG);

  if (pathname === '/' && !langCookie) {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const preferredLang = acceptLanguage.toLowerCase().includes('en') ? LANG.EN : LANG.SV;

    if (preferredLang === LANG.EN) {
      const url = request.nextUrl.clone();
      url.pathname = '/en';
      const response = NextResponse.redirect(url);

      response.cookies.set(COOKIES.PREFERRED_LANG, LANG.EN, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
      });

      return response;
    } else {
      const response = NextResponse.next();
      response.cookies.set(COOKIES.PREFERRED_LANG, LANG.SV, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
      });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
