import { changePasswordService, InvalidPasswordError, SamePasswordError } from '@/features/server';
import { AuthenticatedUser, ChangePasswordType } from '@/features';
import { apiHandler } from '@/shared/server';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { UserNotFoundError } from '@/entities/server';

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

      if (error instanceof InvalidPasswordError) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 403 }
        );
      }

      if (error instanceof UserNotFoundError) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      if (error instanceof SamePasswordError) {
        return NextResponse.json(
          { error: 'New password must differ from current' },
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