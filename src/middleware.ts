import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './shared/lib/i18n/routing';
import { getAuthToken, verifyToken } from './shared/lib/auth';

const intlMiddleware = createIntlMiddleware(routing);

// Public routes accessible without authorization
const publicRoutes = ['/auth', '/verify', '/api/auth/login', '/api/auth/register', '/api/verify', '/api/auth/resend-verification', "/api/auth/verify-email"];

// Routes for admins only
const adminRoutes = ['/admin'];

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if this is an API route
  if (pathname.startsWith('/api')) {
    // Пропускаем публичные API роуты
    if (publicRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.next();
    }

    // For protected API routes, we verify the token
    const token = getAuthToken(request);
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  // We use the intl middleware for all other routes
  const response = intlMiddleware(request);

  // Checking Secure Pages
  const isPublicRoute = publicRoutes.some(route =>
    pathname.includes(route)
  );

  if (!isPublicRoute) {
    const token = getAuthToken(request);
    if (!token || !(await verifyToken(token))) {
      // Redirect to the login page
      const locale = pathname.split('/')[1] || 'en';
      return NextResponse.redirect(new URL(`/${locale}/auth`, request.url));
    }
  }

  // Checking the admin routes
  const isAdminRoute = adminRoutes.some(route => pathname.includes(route));
  if (isAdminRoute) {
    const token = getAuthToken(request);
    if (token) {
      const payload = await verifyToken(token);
      if (payload?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: ['/', '/(en|ru)/:path*', '/((?!_next|.*\\..*).*)']
};