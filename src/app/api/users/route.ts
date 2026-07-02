import { ResponseUsersDTO } from '@/entities';
import { getFilteredUsers } from '@/entities/server';
import { PAGINATION_PRODUCTS_DEFAULTS } from '@/shared';
import { apiHandler } from '@/shared/server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = apiHandler(async (request: NextRequest): Promise<NextResponse<ResponseUsersDTO | { error: string }>> => {
  try {
    const { searchParams } = request.nextUrl;

    const response = await getFilteredUsers({
      page: parseInt(searchParams.get('page') || `${PAGINATION_PRODUCTS_DEFAULTS.PAGE}`),
      limit: parseInt(searchParams.get('limit') || `${PAGINATION_PRODUCTS_DEFAULTS.LIMIT}`),
      search: searchParams.get('search') || '',
    })

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Fetch users error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch getFilteredUsers' },
      { status: 500 }
    );
  }
});