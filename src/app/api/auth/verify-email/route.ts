import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { activateUserByEmail, validateVerificationCode } from '@/features/server';
import { VerifyCodeEmail } from '@/features';
import { deleteVerificationCodesByEmail, invalidateUsersCacheList, sendConfirmationEmail } from '@/entities/server';
import { getLocaleFromRequest, NotFoundError } from '@/shared/server';

export async function POST(request: NextRequest): Promise<NextResponse<{ success: boolean } | { error: string }>> {
  try {
    const body: VerifyCodeEmail = await request.json();

    const { name, email } = await validateVerificationCode(body);
    const locale = getLocaleFromRequest(request);

    await activateUserByEmail(email)
    await deleteVerificationCodesByEmail(email)
    await sendConfirmationEmail({ name, email, locale })

    invalidateUsersCacheList({ locale })

    return NextResponse.json({ success: true }, { status: 200 });
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

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}