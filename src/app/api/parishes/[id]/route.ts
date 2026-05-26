import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/shared/lib/middleware';
// import { getParishById, updateParish, deleteParish } from '@/services/parishService';

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
  // await deleteParish(params.id);
  return NextResponse.json({ success: true });
});