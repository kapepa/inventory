import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const locale = request.cookies.get('NEXT_LOCALE')?.value || routing.defaultLocale;

  const response = intlMiddleware(request);

  if (response instanceof NextResponse) {
    response.headers.set('x-locale', locale);

    if (!request.cookies.has('NEXT_LOCALE')) {
      response.cookies.set('NEXT_LOCALE', locale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      });
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};