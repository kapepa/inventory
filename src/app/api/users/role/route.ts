import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/app/api/_middleware';
import { ZodError } from 'zod';
import { getLocaleFromRequest } from '@/shared/lib/get-locale-from-request';
import { ForbiddenError, InvalidInputError } from '@/shared/lib/server';
import { setAuthCookie } from '@/shared/lib/auth';
import { AuthenticatedUser } from '@/features/auth/model/types';
import { ChangeUserRoleType, UserRoleType } from '@/features/change-user-role/model/types';
import { changeUserRoleService } from '@/features/change-user-role/lib/change-user-role-service';
import { invalidateUserCacheById } from '@/entities/user/lib/cache-invalidation';

export const PATCH = apiHandler(
  async (request: NextRequest, user: AuthenticatedUser): Promise<NextResponse<UserRoleType | { error: string }>> => {
    try {
      const body: ChangeUserRoleType = await request.json();
      const { role, token } = await changeUserRoleService({ user, body })

      const locale = getLocaleFromRequest(request);
      invalidateUserCacheById({ id: user.id, locale });

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