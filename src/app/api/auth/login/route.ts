import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookie } from '@/shared/lib/auth';
import { ZodError } from 'zod';
import { InvalidCredentialsError } from '@/features/server';
import { authLogout } from '@/features/auth/api/auth-service';
import { AuthSignIn } from '@/features';

export async function POST(request: NextRequest) {
  try {
    const body: AuthSignIn = await request.json();
    const token = await authLogout(body)

    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

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

    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}