import { NextRequest, NextResponse } from 'next/server';
import { deleteParish } from '@/features/server';
import { AuthenticatedUser } from '@/features';
import { getParishById } from '@/entities/server';
import { ForbiddenError, HasDependenciesError, NotFoundError } from '@/shared/server';
import { apiHandler } from '@/app/api/_middleware';

export const DELETE = apiHandler(
  async (_: NextRequest, user: AuthenticatedUser, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse<{ success: boolean } | { error: string }>> => {
    const { id } = await params;
    try {
      if (user?.role !== "ADMIN") throw new ForbiddenError('Admin access required');

      const existingParish = await getParishById({ id })
      if (!existingParish) throw new NotFoundError('Parish');
      if (existingParish._count.products > 0) throw new HasDependenciesError('Parish');

      await deleteParish(id);
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