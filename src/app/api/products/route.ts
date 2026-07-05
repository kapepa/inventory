import { extractPublicId, ResponseProductsShortDTO } from '@/entities';
import { getFilteredProductsShort } from '@/entities/server';
import { deleteFile } from '@/entities/server';
import { AuthenticatedUser, ProductCreate } from '@/features';
import { createProduct } from '@/features/server';
import { AppLocale, defaultLocale, locales, PAGINATION_PRODUCTS_DEFAULTS } from '@/shared';
import { apiHandler } from '@/shared/server';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const GET = apiHandler(async (request: NextRequest): Promise<NextResponse<ResponseProductsShortDTO | { error: string }>> => {
  try {
    const { searchParams } = request.nextUrl;
    const rawLocale = request.headers.get('Accept-Language') || defaultLocale;
    const locale = (rawLocale.split(',')[0].split('-')[0].trim().toLowerCase()) as AppLocale;

    const finalLocale = (locales.includes(locale) ? locale : defaultLocale);

    const response = await getFilteredProductsShort({
      parishId: searchParams.get('parishId') || '',
      page: parseInt(searchParams.get('page') || `${PAGINATION_PRODUCTS_DEFAULTS.PAGE}`),
      limit: parseInt(searchParams.get('limit') || `${PAGINATION_PRODUCTS_DEFAULTS.LIMIT}`),
      search: searchParams.get('search') || '',
      locale: finalLocale
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

export const POST = apiHandler(async (request: NextRequest, user: AuthenticatedUser): Promise<NextResponse<ProductCreate | { error: string }>> => {
  let photoToCleanup: string | null = null
  try {
    const body = await request.json();
    photoToCleanup = extractPublicId(body.photo);
    body.userId = user?.id
    const newProduct = await createProduct(body);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    if (photoToCleanup) {
      try {
        await deleteFile(photoToCleanup);
      } catch (deleteError) {
        console.error('Failed to clean up uploaded file in Cloudinary:', deleteError);
      }
    }
    if (error instanceof ZodError || error?.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Invalid data format', details: error.format ? error.format() : error.issues },
        { status: 400 }
      );
    }

    // If this is a Prisma uniqueness error (for example, a serial number like this already exists)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Product with this serial number already exists' },
        { status: 409 } // 409 Conflict
      );
    }

    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
});