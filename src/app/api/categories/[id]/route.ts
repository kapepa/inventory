import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/shared/lib/middleware';
import { deleteCategory } from '@/features/server';
import { AuthenticatedUser } from '@/features';
import { AdminAccessRequiredError, CategoryHasProductsError, CategoryNotFoundError, getCategoryhById } from '@/entities/server';

export const DELETE = apiHandler(async (_: NextRequest, user: AuthenticatedUser, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  try {
    if (user?.role !== "ADMIN") throw new AdminAccessRequiredError()

    const existingParish = await getCategoryhById({ id })
    if (!existingParish) throw new CategoryNotFoundError()
    if (existingParish._count.products >= 1) throw new CategoryHasProductsError()

    await deleteCategory(id);
    return NextResponse.json({ success: true });
  } catch (error) {

    if (error instanceof AdminAccessRequiredError) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }

    if (error instanceof CategoryNotFoundError) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }

    if (error instanceof CategoryHasProductsError) {
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