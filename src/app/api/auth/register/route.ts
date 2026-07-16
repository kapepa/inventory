import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { authRegister } from '@/features/server';
import { createVerificationCode, sendVerificationEmail } from '@/entities/server';
import { AuthSignUp } from '@/features';
import { AppLocale, defaultLocale } from '@/shared';
import { AlreadyExistsError, NotVerifiedError } from '@/shared/server';

export async function POST(request: NextRequest): Promise<NextResponse<string | { error: string }>> {
  try {
    const rawLocale = request.headers.get('Accept-Language') || defaultLocale;
    const locale = (rawLocale.split(',')[0].split('-')[0].trim().toLowerCase()) as AppLocale;

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

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}