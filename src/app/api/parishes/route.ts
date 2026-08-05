import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/app/api/_middleware';
import { ZodError } from 'zod';
import { PAGINATION_PARISHES_DEFAULTS } from '@/shared/constants/pagination';
import { getLocaleFromRequest } from '@/shared/lib/get-locale-from-request';
import { AlreadyExistsError, ForbiddenError } from '@/shared/lib/server';
import { ParishWithRelationsTotals, ResponseParishesDTO } from '@/entities/parish/model/types';
import { getParishesCached } from '@/entities/parish/lib/parish-service-cached';
import { AuthenticatedUser } from '@/features/auth/model/types';
import { createParish } from '@/features/add-parish/lib/add-parish-service';
import { invalidateParishesCacheList } from '@/entities/parish/lib/cache-invalidation';

export const GET = apiHandler(async (request: NextRequest): Promise<NextResponse<ResponseParishesDTO | { error: string }>> => {
  try {
    const { searchParams } = request.nextUrl;
    const locale = getLocaleFromRequest(request);

    const result = await getParishesCached({
      page: parseInt(searchParams.get('page') || `${PAGINATION_PARISHES_DEFAULTS.PAGE}`),
      limit: parseInt(searchParams.get('limit') || `${PAGINATION_PARISHES_DEFAULTS.LIMIT}`),
      search: searchParams.get('search') || '',
      locale: locale
    });

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Fetch parishes error details:', {
      message: error.message,
      stack: error.stack,
      prismaCode: error.code,
      prismaMeta: error.meta
    });

    return NextResponse.json(
      { error: error.message || 'Failed to fetch parishes' },
      { status: 500 }
    );
  }
});

export const POST = apiHandler(async (request: NextRequest, user: AuthenticatedUser): Promise<NextResponse<ParishWithRelationsTotals | { error: string }>> => {
  try {
    if (user.role !== "ADMIN") throw new ForbiddenError('Admin access required');
    const body = await request.json();
    const result = await createParish(body);

    const locale = getLocaleFromRequest(request);
    invalidateParishesCacheList({ locale })

    return NextResponse.json(result, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid data format', details: error.format() },
        { status: 400 }
      )
    }

    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }

    if (error instanceof AlreadyExistsError) {
      return NextResponse.json(
        { error: error.message },
        { status: 409 }
      );
    }

    console.error('Create parish error:', error);
    return NextResponse.json(
      { error: 'Failed to create parish' },
      { status: 500 }
    );
  }
});