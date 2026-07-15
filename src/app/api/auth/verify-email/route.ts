import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { activateUserByEmail, validateVerificationCode } from '@/features/server';
import { VerifyCodeEmail } from '@/features';
import { deleteVerificationCodesByEmail, sendConfirmationEmail } from '@/entities/server';
import { AppLocale, defaultLocale } from '@/shared';
import { NotFoundError } from '@/shared/server';

export async function POST(request: NextRequest): Promise<NextResponse<boolean | { error: string }>> {
  try {
    const rawLocale = request.headers.get('Accept-Language') || defaultLocale;
    const locale = (rawLocale.split(',')[0].split('-')[0].trim().toLowerCase()) as AppLocale;

    const body: VerifyCodeEmail = await request.json();
    const { name, email } = await validateVerificationCode(body);
    await activateUserByEmail(email)
    await deleteVerificationCodesByEmail(email)
    await sendConfirmationEmail({ name, email, locale })

    return NextResponse.json(true, { status: 200 });
  } catch (error) {
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

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}