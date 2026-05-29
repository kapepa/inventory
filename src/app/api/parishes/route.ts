import { getParishes } from '@/entities';
import { GetParishesResponse } from '@/entities/parish/model/types';
import { Locale, PAGINATION_PARISHES_DEFAULTS } from '@/shared';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest): Promise<NextResponse<GetParishesResponse | { error: string }>> => {
  try {
    const { searchParams } = request.nextUrl;
    const result = await getParishes({
      page: parseInt(searchParams.get('page') || `${PAGINATION_PARISHES_DEFAULTS.PAGE}`),
      limit: parseInt(searchParams.get('limit') || `${PAGINATION_PARISHES_DEFAULTS.PARISHES_LIMIT}`),
      search: searchParams.get('search') || '',
      locale: request.headers.get('x-locale') as Locale
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error('Fetch parishes error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch parishes' },
      { status: 500 }
    );
  }
};