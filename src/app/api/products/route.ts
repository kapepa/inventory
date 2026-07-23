import { ProductWithRelationsShort, ResponseProductsShortDTO } from '@/entities';
import { getFilteredProductsShortCached, invalidateProductCacheList, deleteFile } from '@/entities/server';
import { createProduct, AuthenticatedUser } from '@/features/server';
import { PAGINATION_PRODUCTS_DEFAULTS } from '@/shared';
import { AlreadyExistsError, ForbiddenError, getLocaleFromRequest } from '@/shared/server';
import { NextRequest, NextResponse } from 'next/server';
import { apiHandler } from '@/app/api/_middleware';
import { ZodError } from 'zod';

export const GET = apiHandler(async (request: NextRequest): Promise<NextResponse<ResponseProductsShortDTO | { error: string }>> => {
  try {
    const { searchParams } = request.nextUrl;
    const locale = getLocaleFromRequest(request);

    const response = await getFilteredProductsShortCached({
      parishId: searchParams.get('parishId') || '',
      page: parseInt(searchParams.get('page') || `${PAGINATION_PRODUCTS_DEFAULTS.PAGE}`),
      limit: parseInt(searchParams.get('limit') || `${PAGINATION_PRODUCTS_DEFAULTS.LIMIT}`),
      search: searchParams.get('search') || '',
      locale: locale
    })

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Fetch products error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
});

export const POST = apiHandler(async (request: NextRequest, user: AuthenticatedUser): Promise<NextResponse<ProductWithRelationsShort | { error: string }>> => {
  let photoToCleanup: string | null = null
  try {
    if (user.role !== "ADMIN") throw new ForbiddenError('Admin access required');
    const body = await request.json();
    photoToCleanup = body.photo;
    body.userId = user?.id
    const newProduct = await createProduct(body);

    const locale = getLocaleFromRequest(request);
    invalidateProductCacheList({ locale })

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    if (photoToCleanup) {
      try {
        await deleteFile(photoToCleanup);
      } catch (deleteError) {
        console.error('Failed to clean up uploaded file in Cloudinary:', deleteError);
      }
    }

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid data format', details: error.format() },
        { status: 400 }
      );
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

    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
});