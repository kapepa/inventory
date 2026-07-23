import { ResponseParishesTotalsDTO } from '@/entities';
import { getParishesTotalsCached } from '@/entities/server';
import { AppLocale, PAGINATION_PARISHES_DEFAULTS, defaultLocale, locales } from '@/shared';
import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/app/api/_middleware';

export const GET = apiHandler(async (request: NextRequest): Promise<NextResponse<ResponseParishesTotalsDTO | { error: string }>> => {
  try {
    const { searchParams } = request.nextUrl;
    const rawLocale = request.headers.get('Accept-Language') || defaultLocale;
    const locale = (rawLocale.split(',')[0].split('-')[0].trim().toLowerCase()) as AppLocale;

    const finalLocale = (locales.includes(locale) ? locale : defaultLocale);

    const result = await getParishesTotalsCached({
      page: parseInt(searchParams.get('page') || `${PAGINATION_PARISHES_DEFAULTS.PAGE}`),
      limit: parseInt(searchParams.get('limit') || `${PAGINATION_PARISHES_DEFAULTS.LIMIT}`),
      search: searchParams.get('search') || '',
      locale: finalLocale
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