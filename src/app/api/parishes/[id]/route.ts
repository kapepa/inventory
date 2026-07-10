import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/shared/lib/middleware';
import { deleteParish } from '@/features/server';
import { AuthenticatedUser } from '@/features';
import { AdminAccessRequiredError, getParishById, ParishNotFoundError } from '@/entities/server';

export const DELETE = apiHandler(async (_: NextRequest, user: AuthenticatedUser, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  try {
    if (user?.role !== "ADMIN") throw new AdminAccessRequiredError()

    const existingParish = await getParishById({ id })
    if (!existingParish) throw new ParishNotFoundError()

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

    return NextResponse.json(
      { error: 'Failed to delete parish' },
      { status: 500 }
    );
  }
});