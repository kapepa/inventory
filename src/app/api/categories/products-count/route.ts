import { getCategoriesWithProductCountCached } from '@/entities/category/lib/category-service-cached';
import { PAGINATION_CATEGORIES_DEFAULTS } from '@/shared/constants';
import { getLocaleFromRequest } from '@/shared/lib/get-locale-from-request';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const locale = getLocaleFromRequest(request);

    const categories = await getCategoriesWithProductCountCached({
      page: parseInt(searchParams.get('page') || `${PAGINATION_CATEGORIES_DEFAULTS.PAGE}`),
      limit: parseInt(searchParams.get('limit') || `${PAGINATION_CATEGORIES_DEFAULTS.LIMIT}`),
      search: searchParams.get('search') || '',
      locale: locale
    });

    return NextResponse.json(categories);
  } catch (error: unknown) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}