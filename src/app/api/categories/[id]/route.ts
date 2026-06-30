import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/shared/lib/middleware';
import { CategoryHasProductsError, deleteCategory } from '@/features/server';
import { MiddlewareUser } from '@/features';
import { getCategoryhById } from '@/entities/server';

export const DELETE = apiHandler(async (_: NextRequest, user: MiddlewareUser, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  try {
    if (user?.role !== "ADMIN") return NextResponse.json(
      { error: 'Forbidden: Admin access required' },
      { status: 403 }
    )

    const existingParish = await getCategoryhById({ id })
    if (!existingParish) return NextResponse.json(
      { error: 'Parish not found' },
      { status: 404 }
    );
    if (existingParish._count.products >= 1) {
      throw new CategoryHasProductsError()
    }

    await deleteCategory(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof CategoryHasProductsError) {
      return NextResponse.json(
        { error: 'Cannot delete category with existing products' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete parish' },
      { status: 500 }
    );
  }
});