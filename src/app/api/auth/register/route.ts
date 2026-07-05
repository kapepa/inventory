import { NextRequest, NextResponse } from 'next/server';
import { signToken, setAuthCookie } from '@/shared';
import { ZodError } from 'zod';
import { UserAlreadyExistsError } from '@/features/server';
import { authRegister } from '@/features/auth/api/auth-service';
import { AuthSignUp } from '@/features';

export async function POST(request: NextRequest) {
  try {
    const body: AuthSignUp = await request.json();
    const profile = await authRegister(body)
    const token = await signToken({ userId: profile.id, email: profile.email, role: profile.role });

    const response = NextResponse.json(
      { message: 'User registered successfully', user: profile },
      { status: 201 }
    );

    return setAuthCookie(response, token);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid data format', details: error.format() },
        { status: 400 }
      )
    }

    if (error instanceof UserAlreadyExistsError) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}