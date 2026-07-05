import { NextRequest, NextResponse } from 'next/server';
import { removeAuthCookie } from '@/shared/lib/auth';

export async function POST(_: NextRequest) {
  const response = NextResponse.json(
    { message: 'Logout successful' },
    { status: 200 }
  );

  return removeAuthCookie(response);
}