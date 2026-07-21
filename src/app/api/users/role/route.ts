import { AuthenticatedUser, ChangeUserRoleType, UserRoleType } from '@/features';
import { changeUserRoleService } from '@/features/server';
import { setAuthCookie } from '@/shared';
import { ForbiddenError, InvalidInputError } from '@/shared/server';
import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/app/api/_middleware';
import { ZodError } from 'zod';

export const PATCH = apiHandler(
  async (request: NextRequest, user: AuthenticatedUser): Promise<NextResponse<UserRoleType | { error: string }>> => {
    try {
      const body: ChangeUserRoleType = await request.json();
      const { role, token } = await changeUserRoleService({ user, body })

      const response = NextResponse.json(role);
      return setAuthCookie(response, token);
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          { error: 'Invalid data format', details: error.format() },
          { status: 400 }
        );
      }

      if (error instanceof InvalidInputError) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      if (error instanceof ForbiddenError) {
        return NextResponse.json(
          { error: error.message },
          { status: 403 }
        );
      }

      console.error('Failed to update rol:', error);
      return NextResponse.json(
        { error: 'Failed to update role.' },
        { status: 500 }
      );
    }
  }
);