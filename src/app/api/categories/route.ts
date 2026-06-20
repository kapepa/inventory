import { NextRequest, NextResponse } from 'next/server'
import { AppLocale, defaultLocale } from '@/shared';
import { getCategories } from '@/entities/server';
import { CategoryWithTranslations } from '@/entities/category/model/types';
import { apiHandler } from '@/shared/server';

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
