import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/shared/lib/middleware';
import { deleteParish } from '@/features/delete-resource/api/parish-service';

export const DELETE = apiHandler(async (_: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  try {
    await deleteParish(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete parish' },
      { status: 500 }
    );
  }
});