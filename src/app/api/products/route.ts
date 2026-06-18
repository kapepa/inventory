import { ResponseProductsShortDTO } from '@/entities';
import { getProductsShortByParishId } from '@/entities/products/api/product-service';
import { ProductCreate, ProductWithRelations } from '@/features';
import { createProduct } from '@/features/add-product/api/product-service';
import { apiHandler, AppLocale, defaultLocale, locales, PAGINATION_PRODUCTS_DEFAULTS } from '@/shared';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

export const GET = apiHandler(async (request: NextRequest): Promise<NextResponse<ResponseProductsShortDTO | { error: string }>> => {
  try {
    const { searchParams } = request.nextUrl;
    const rawLocale = request.headers.get('Accept-Language') || defaultLocale;
    const locale = (rawLocale.split(',')[0].split('-')[0].trim().toLowerCase()) as AppLocale;

    const finalLocale = (locales.includes(locale) ? locale : defaultLocale);

    const response = await getProductsShortByParishId({
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

export const POST = apiHandler(async (request: NextRequest): Promise<NextResponse<ProductWithRelations | { error: string }>> => {
  try {
    const body: ProductCreate = await request.json();
    const newProduct = await createProduct(body);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid data format', details: error.format() },
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