import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { getLocaleFromRequest } from '@/shared/lib/get-locale-from-request';
import { AlreadyExistsError, EmailSendError, NotVerifiedError } from '@/shared/lib/server';
import { AuthSignUp } from '@/features/auth/model/types';
import { authRegister } from '@/features/auth/lib/auth-service';
import { createVerificationCode } from '@/entities/verify/lib/create-verification-code';
import { sendVerificationEmail } from '@/entities/email/lib/send-verification-email';

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