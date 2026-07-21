import { ResponseUsersDTO } from '@/entities';
import { getFilteredUsers } from '@/entities/server';
import { AuthenticatedUser } from '@/features';
import { deleteAccount } from '@/features/server';
import { PAGINATION_PRODUCTS_DEFAULTS, removeAuthCookie } from '@/shared';
import { apiHandler } from '@/app/api/_middleware';
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
  } catch (error: unknown) {
    console.error('Fetch users error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch getFilteredUsers' },
      { status: 500 }
    );
  }
});

export const DELETE = apiHandler(
  async (_: NextRequest, user: AuthenticatedUser): Promise<NextResponse<{ message: string } | { error: string }>> => {
    try {
      await deleteAccount(user.id)
      return removeAuthCookie(NextResponse.json(
        { message: 'Account deleted successfully' },
        { status: 200 }
      ));
    } catch (error: unknown) {
      console.error('Fetch users error:', error);
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Failed ещ delete account' },
        { status: 500 }
      );
    }
  });