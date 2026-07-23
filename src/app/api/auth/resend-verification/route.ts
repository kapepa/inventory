import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { validateEmailForResend } from '@/features/server';
import { createVerificationCode, sendVerificationEmail } from '@/entities/server';
import { AuthSignUp } from '@/features';
import { EmailSendError, getLocaleFromRequest, NotFoundError } from '@/shared/server';

export async function POST(request: NextRequest): Promise<NextResponse<string | { error: string }>> {
  try {
    const locale = getLocaleFromRequest(request);

    const body: AuthSignUp = await request.json();
    const user = await validateEmailForResend(body);
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

    if (error instanceof NotFoundError) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }

    if (error instanceof EmailSendError) {
      console.error('Failed to resend verification email:', error);
      return NextResponse.json(
        { error: 'Failed to resend verification email. Please try again later or contact support.' },
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