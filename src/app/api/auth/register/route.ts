import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { authRegister } from '@/features/server';
import { createVerificationCode, sendVerificationEmail } from '@/entities/server';
import { AuthSignUp } from '@/features';
import { AlreadyExistsError, EmailSendError, getLocaleFromRequest, NotVerifiedError } from '@/shared/server';

export async function POST(request: NextRequest): Promise<NextResponse<string | { error: string }>> {
  try {
    const locale = getLocaleFromRequest(request);

    const body: AuthSignUp = await request.json();
    const user = await authRegister(body);
    const verify = await createVerificationCode({ userId: user.id, email: user.email });
    const { verificationLink } = await sendVerificationEmail({
      locale,
      name: user.name,
      email: user.email,
      token: verify.token,
      code: verify.code
    })

    return NextResponse.json(verificationLink, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid data format', details: error.format() },
        { status: 400 }
      )
    }

    if (error instanceof NotVerifiedError) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }

    if (error instanceof AlreadyExistsError) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 }
      );
    }

    if (error instanceof EmailSendError) {
      console.error('User registered but verification email failed:', error);
      return NextResponse.json(
        { error: 'Registration successful but failed to send verification email. Please contact support.' },
        { status: 500 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}