import { NextRequest, NextResponse } from 'next/server';

const TOKEN_NAME = 'auth_token';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export const setAuthCookie = (response: NextResponse, token: string) => {
  response.cookies.set({
    name: TOKEN_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  });
  return response;
};

export const removeAuthCookie = (response: NextResponse) => {
  response.cookies.delete(TOKEN_NAME);
  return response;
};

export const getAuthToken = (request: NextRequest): string | null => {
  return request.cookies.get(TOKEN_NAME)?.value || null;
};