import { apiHandler } from '@/app/api/_middleware';
import { NextRequest, NextResponse } from 'next/server';
import { PAGINATION_PRODUCTS_DEFAULTS } from '@/shared/constants';
import { getLocaleFromRequest } from '@/shared/lib/get-locale-from-request';
import { removeAuthCookie } from '@/shared/lib/auth';
import { getFilteredUsers } from '@/entities/user/lib/user-service';
import { AuthenticatedUser } from '@/features/auth/model/types';
import { deleteAccount } from '@/features/delete-resource/lib/account-service';
import { invalidateUserCacheById } from '@/entities/user/lib/cache-invalidation';
import { ResponseUsersDTO } from '@/entities/user/model/types';

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
  async (request: NextRequest, user: AuthenticatedUser): Promise<NextResponse<{ message: string } | { error: string }>> => {
    try {
      await deleteAccount(user.id)

      const locale = getLocaleFromRequest(request);
      invalidateUserCacheById({ id: user.id, locale })

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