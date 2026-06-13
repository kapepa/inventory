import { NextRequest, NextResponse } from 'next/server'
import { apiHandler, AppLocale, defaultLocale } from '@/shared';
import { getCategories } from '@/entities/category/api/category-service';
import { CategoryWithTranslations } from '@/entities/category/model/types';

export const GET = apiHandler(async (request: NextRequest): Promise<NextResponse<CategoryWithTranslations[] | { error: string }>> => {
  try {
    const rawLocale = request.headers.get('Accept-Language') || defaultLocale;
    const locale = (rawLocale.split(',')[0].split('-')[0].trim().toLowerCase()) as AppLocale;

    const categories = await getCategories({ locale })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Failed to fetch categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
})
