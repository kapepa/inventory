import { changePasswordService } from '@/features/server';
import { AuthenticatedUser, ChangePasswordDTO, ChangePasswordType } from '@/features';
import { apiHandler, EmailSendError, InvalidCredentialsError, InvalidInputError, NotFoundError } from '@/shared/server';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { AppLocale, defaultLocale } from '@/shared';
import { sendChangePasswordEmail } from '@/entities/server';

export const PATCH = apiHandler(
  async (request: NextRequest, user: AuthenticatedUser): Promise<NextResponse<ChangePasswordDTO | { error: string }>> => {
    try {
      const rawLocale = request.headers.get('Accept-Language') || defaultLocale;
      const locale = (rawLocale.split(',')[0].split('-')[0].trim().toLowerCase()) as AppLocale;

      const body: ChangePasswordType = await request.json();

      await changePasswordService({ user, body });
      try {
        await sendChangePasswordEmail({ email: user.email, name: user.name, locale });
      } catch (emailError) {
        // Password was changed successfully, but email failed
        if (emailError instanceof EmailSendError) {
          console.error('Password changed but email notification failed:', emailError);
          return NextResponse.json(
            { success: true, warning: 'Password changed but email notification failed' },
            { status: 200 }
          );
        }
        throw emailError;
      }
      await sendChangePasswordEmail({ email: user.email, name: user.name, locale })

      return NextResponse.json({ success: true });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          { error: 'Invalid data format', details: error.format() },
          { status: 400 }
        );
      }

      if (error instanceof InvalidCredentialsError) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 403 }
        );
      }

      if (error instanceof NotFoundError) {
        return NextResponse.json(
          { error: error.message },
          { status: 404 }
        );
      }

      if (error instanceof InvalidInputError) {
        return NextResponse.json(
          { error: error.message },
          { status: 409 }
        );
      }

      console.error('Failed to change password:', error);
      return NextResponse.json(
        { error: 'Failed to change password' },
        { status: 500 }
      );
    }
  });