import { AuthenticatedUser, ChangeUserRoleType } from '@/features';
import { changeUserRoleService } from '@/features/server';
import { apiHandler, ForbiddenError, InvalidInputError, NotFoundError } from '@/shared/server';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const PATCH = apiHandler(
  async (request: NextRequest, user: AuthenticatedUser): Promise<NextResponse<{ success: boolean } | { error: string }>> => {
    try {
      const body: ChangeUserRoleType = await request.json();
      await changeUserRoleService({ user, body })

      return NextResponse.json({ success: true });
    } catch (error: any) {
      if (error instanceof ZodError) {
        return NextResponse.json(
          { error: 'Invalid data format', details: error.format() },
          { status: 400 }
        );
      }

      if (error instanceof ForbiddenError) {
        return NextResponse.json(
          { error: error.message },
          { status: 403 }
        );
      }

      if (error instanceof InvalidInputError) {
        return NextResponse.json(
          { error: error.message },
          { status: 400 }
        );
      }

      if (error instanceof NotFoundError) {
        return NextResponse.json(
          { error: error.message },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: error.message || 'Failed to fetch getFilteredUsers' },
        { status: 500 }
      );
    }
  }
);