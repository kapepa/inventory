import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/app/api/_middleware';
import { ZodError } from 'zod';
import { EmailSendError, getLocaleFromRequest, InvalidCredentialsError, InvalidInputError, NotFoundError } from '@/shared/lib/server';
import { AuthenticatedUser } from '@/features/auth/model/types';
import { ChangePasswordDTO, ChangePasswordType } from '@/features/change-password/model/types';
import { changePasswordService } from '@/features/change-password/lib/change-password-service';
import { sendChangePasswordEmail } from '@/entities/email/lib/send-change-password-email';

export const PATCH = apiHandler(
  async (request: NextRequest, user: AuthenticatedUser): Promise<NextResponse<ChangePasswordDTO | { error: string }>> => {
    try {
      const locale = getLocaleFromRequest(request);
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