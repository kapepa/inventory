import { NextRequest, NextResponse } from 'next/server'
import { AppLocale, defaultLocale } from '@/shared';
import { getCategories } from '@/entities/server';
import { CategoryWithProductCount, CategoryWithTranslations } from '@/entities';
import { AlreadyExistsError, ForbiddenError } from '@/shared/server';
import { createCategory } from '@/features/server';
import { ZodError } from 'zod';
import { AuthenticatedUser } from '@/features';
import { apiHandler } from '@/app/api/_middleware';

export const GET = apiHandler(async (request: NextRequest): Promise<NextResponse<CategoryWithTranslations[] | { error: string }>> => {
  try {
    const rawLocale = request.headers.get('Accept-Language') || defaultLocale;
    const locale = (rawLocale.split(',')[0].split('-')[0].trim().toLowerCase()) as AppLocale;

    const categories = await getCategories({ locale })

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
    const category = await createCategory(body)

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
