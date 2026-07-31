import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/app/api/_middleware';;
import { PAGINATION_PARISHES_DEFAULTS } from '@/shared/constants';
import { getLocaleFromRequest } from '@/shared/lib/get-locale-from-request';
import { ResponseParishesTotalsDTO } from '@/entities/parish/model/types';
import { getParishesTotalsCached } from '@/entities/parish/lib/parish-service-cached';

export const GET = apiHandler(async (request: NextRequest): Promise<NextResponse<ResponseParishesTotalsDTO | { error: string }>> => {
  try {
    const { searchParams } = request.nextUrl;
    const locale = getLocaleFromRequest(request);

    const result = await getParishesTotalsCached({
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
      { error: 'Failed to fetch parishes' },
      { status: 500 }
    );
  }
});