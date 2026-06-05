import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/shared/lib/middleware';
import { deleteParish } from '@/entities/parish/api/parish-service';

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  // const parish = await getParishById(params.id);
  const parish = {}

  if (!parish) {
    return NextResponse.json(
      { error: 'Parish not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(parish);
};

export const PUT = apiHandler(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const body = await request.json();
  // const updated = await updateParish(params.id, body);
  const updated = {};
  return NextResponse.json(updated);
});

export const DELETE = apiHandler(async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
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