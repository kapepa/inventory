import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/shared/lib/middleware';
import { deleteParish } from '@/features/server';
import { AuthenticatedUser } from '@/features';
import { AdminAccessRequiredError, getParishById, ParishHasProductsError, ParishNotFoundError } from '@/entities/server';

export const DELETE = apiHandler(async (_: NextRequest, user: AuthenticatedUser, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  try {
    if (user?.role !== "ADMIN") throw new AdminAccessRequiredError()

    const existingParish = await getParishById({ id })
    if (!existingParish) throw new ParishNotFoundError()
    if (existingParish._count.products > 0) throw new ParishHasProductsError()

    await deleteParish(id);
    return NextResponse.json({ success: true });
  } catch (error) {

    if (error instanceof AdminAccessRequiredError) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }

    if (error instanceof ParishNotFoundError) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }

    if (error instanceof ParishHasProductsError) {
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