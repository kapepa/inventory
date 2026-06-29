import { getCategoriesWithProductCount } from '@/entities/server';
import { AppLocale, defaultLocale, locales, PAGINATION_CATEGORIES_DEFAULTS } from '@/shared';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const rawLocale = request.headers.get('Accept-Language') || defaultLocale;
    const locale = (rawLocale.split(',')[0].split('-')[0].trim().toLowerCase()) as AppLocale;
    const finalLocale = (locales.includes(locale) ? locale : defaultLocale);

    const categories = await getCategoriesWithProductCount({
      page: parseInt(searchParams.get('page') || `${PAGINATION_CATEGORIES_DEFAULTS.PAGE}`),
      limit: parseInt(searchParams.get('limit') || `${PAGINATION_CATEGORIES_DEFAULTS.LIMIT}`),
      search: searchParams.get('search') || '',
      locale: finalLocale
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}