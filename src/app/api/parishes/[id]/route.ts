import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/shared/lib/middleware';
import { deleteParish } from '@/features/server';
import { AuthenticatedUser } from '@/features';
import { getParishById } from '@/entities/server';

export const DELETE = apiHandler(async (_: NextRequest, user: AuthenticatedUser, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  try {
    if (user?.role !== "ADMIN") return NextResponse.json(
      { error: 'Forbidden: Admin access required' },
      { status: 403 }
    )

    const existingParish = await getParishById({ id })
    if (!existingParish) return NextResponse.json(
      { error: 'Parish not found' },
      { status: 404 }
    );

    await deleteParish(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete parish' },
      { status: 500 }
    );
  }
});