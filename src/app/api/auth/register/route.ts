import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { authRegister, UserAlreadyExistsError } from '@/features/server';
import { createVerificationCode } from '@/entities/server';
import { AuthSignUp } from '@/features';

export async function POST(request: NextRequest) {
  try {
    const body: AuthSignUp = await request.json();
    const user = await authRegister(body);
    const verify = await createVerificationCode({ userId: user.id, email: user.email });


    return "";
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