import { ParishWithRelationsTotals, ResponseParishesDTO } from '@/entities';
import { getParishes } from '@/entities/server';
import { AuthenticatedUser } from '@/features';
import { createParish } from '@/features/server';
import { AppLocale, PAGINATION_PARISHES_DEFAULTS, defaultLocale, locales } from '@/shared';
import { AlreadyExistsError, ForbiddenError } from '@/shared/server';
import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/app/api/_middleware';
import { ZodError } from 'zod';

export const GET = apiHandler(async (request: NextRequest): Promise<NextResponse<ResponseParishesDTO | { error: string }>> => {
  try {
    const { searchParams } = request.nextUrl;
    const rawLocale = request.headers.get('Accept-Language') || defaultLocale;
    const locale = (rawLocale.split(',')[0].split('-')[0].trim().toLowerCase()) as AppLocale;

    const finalLocale = (locales.includes(locale) ? locale : defaultLocale);

    const result = await getParishes({
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