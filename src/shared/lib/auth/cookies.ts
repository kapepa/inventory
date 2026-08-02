import { AUTH_CONFIG, COOKIE_KEYS } from '@/shared/constants';
import { NextRequest, NextResponse } from 'next/server';

export const setAuthCookie = <T = unknown>(response: NextResponse<T>, token: string) => {
  response.cookies.set({
    name: COOKIE_KEYS.AUTH_TOKEN,
    value: token,
    httpOnly: true,
    secure: false, // secure: process.env.NODE_ENV === 'production'
    sameSite: 'lax',
    maxAge: AUTH_CONFIG.COOKIE_MAX_AGE,
    path: '/',
  });
  return response;
};

export const removeAuthCookie = <T = unknown>(response: NextResponse<T>): NextResponse<T> => {
  response.cookies.delete(COOKIE_KEYS.AUTH_TOKEN);
  return response;
};

export const getAuthToken = (request: NextRequest): string | null => {
  return request.cookies.get(COOKIE_KEYS.AUTH_TOKEN)?.value || null;
};