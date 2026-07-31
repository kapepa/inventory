import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/app/api/_middleware';
import { ForbiddenError, getLocaleFromRequest, HasDependenciesError, NotFoundError } from '@/shared/lib/server';
import { AuthenticatedUser } from '@/features/auth/model/types';
import { getParishById } from '@/entities/parish/lib/parish-service';
import { deleteParish } from '@/features/delete-resource/lib/parish-service';
import { invalidateParishCacheById } from '@/entities/parish/lib/cache-invalidation';

export const DELETE = apiHandler(
  async (request: NextRequest, user: AuthenticatedUser, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse<{ success: boolean } | { error: string }>> => {
    const { id } = await params;
    try {
      if (user?.role !== "ADMIN") throw new ForbiddenError('Admin access required');

      const existingParish = await getParishById({ id })
      if (!existingParish) throw new NotFoundError('Parish');
      if (existingParish._count.products > 0) throw new HasDependenciesError('Parish');

      await deleteParish(id);

      const locale = getLocaleFromRequest(request);
      invalidateParishCacheById({ id, locale })

      return NextResponse.json({ success: true });
    } catch (error: unknown) {

      if (error instanceof ForbiddenError) {
        return NextResponse.json(
          { error: error.message },
          { status: 403 }
        );
      }

      if (error instanceof NotFoundError) {
        return NextResponse.json(
          { error: error.message },
          { status: 404 }
        );
      }

      if (error instanceof HasDependenciesError) {
        return NextResponse.json(
          { error: error.message },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to delete parish' },
        { status: 500 }
      );
    }
  });