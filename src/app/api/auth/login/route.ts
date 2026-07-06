import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookie } from '@/shared/lib/auth';
import { ZodError } from 'zod';
import { authLogin, EmailNotVerifiedError, InvalidCredentialsError } from '@/features/server';
import { AuthSignIn } from '@/features';

export async function POST(request: NextRequest) {
  try {
    const body: AuthSignIn = await request.json();
    const { token, user } = await authLogin(body)
    const response = NextResponse.json(user);

    return setAuthCookie(response, token);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid data format', details: error.format() },
        { status: 400 }
      )
    }

    if (error instanceof InvalidCredentialsError) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 }
      );
    }

    if (error instanceof EmailNotVerifiedError) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}