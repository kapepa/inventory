import { changePasswordService } from '@/features/server';
import { AuthenticatedUser, ChangePasswordType } from '@/features';
import { apiHandler, InvalidCredentialsError, InvalidInputError, NotFoundError } from '@/shared/server';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const PATCH = apiHandler(
  async (request: NextRequest, user: AuthenticatedUser): Promise<NextResponse<{ success: boolean } | { error: string }>> => {
    try {
      const body: ChangePasswordType = await request.json();
      await changePasswordService({ user, body });

      return NextResponse.json({ success: true });
    } catch (error) {

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