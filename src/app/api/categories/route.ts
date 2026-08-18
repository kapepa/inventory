import { NextRequest, NextResponse } from 'next/server'

import { ZodError } from 'zod';
import { apiHandler } from '@/app/api/_middleware';
import { getLocaleFromRequest } from '@/shared/lib/get-locale-from-request';
import { AlreadyExistsError, ForbiddenError } from '@/shared/lib/server';
import { getCategoriesCached } from '@/entities/category/lib/category-service-cached';
import { invalidateCategoriesCacheList } from '@/entities/category/lib/category-invalidation';
import { CategoryWithProductCount, CategoryWithTranslations } from '@/entities/category/model/types';
import { AuthenticatedUser } from '@/features/auth/model/types';
import { createCategory } from '@/features/add-category/lib/category-service';

export const GET = apiHandler(async (request: NextRequest): Promise<NextResponse<CategoryWithTranslations[] | { error: string }>> => {
  try {
    const locale = getLocaleFromRequest(request);
    const categories = await getCategoriesCached({ locale })

    return NextResponse.json(categories)
  } catch (error: unknown) {
    console.error('Failed to fetch categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
})

export const POST = apiHandler(async (request: NextRequest, user: AuthenticatedUser): Promise<NextResponse<CategoryWithProductCount | { error: string }>> => {
  try {
    if (user.role !== "ADMIN") throw new ForbiddenError('Admin access required');
    const body = await request.json();
    const locale = getLocaleFromRequest(request);
    const category = await createCategory({ input: body, locale })

    invalidateCategoriesCacheList({ locale })

    return NextResponse.json(category)
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

    console.error('Failed to create categori:', error)
    return NextResponse.json(
      { error: 'Failed to create categori' },
      { status: 500 }
    )
  }
})
