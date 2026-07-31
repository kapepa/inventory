import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/app/api/_middleware';
import { ForbiddenError, getLocaleFromRequest, HasDependenciesError, NotFoundError } from '@/shared/lib/server';
import { getCategoryById } from '@/entities/category/lib/category-service';
import { invalidateCategoryCacheById } from '@/entities/category/lib/category-invalidation';
import { deleteCategory } from '@/features/delete-resource/lib/category-service';
import { AuthenticatedUser } from '@/features/auth/model/types';

export const DELETE = apiHandler(async (request: NextRequest, user: AuthenticatedUser, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  try {
    if (user?.role !== "ADMIN") throw new ForbiddenError('Admin access required');

    const existingParish = await getCategoryById({ id })
    if (!existingParish) throw new NotFoundError('Category');
    if (existingParish._count.products >= 1) throw new HasDependenciesError('Category');

    await deleteCategory(id);

    const locale = getLocaleFromRequest(request);
    invalidateCategoryCacheById({ id, locale })

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