import { ResponseProductsDTO } from '@/entities';
import { getProductsByParishId } from '@/entities/products/api/product-service';
import { ProductCreate, ProductWithRelations } from '@/features';
import { createProduct } from '@/features/add-product/api/product-service';
import { AppLocale, defaultLocale, locales, PAGINATION_PRODUCTS_DEFAULTS } from '@/shared';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest): Promise<NextResponse<ResponseProductsDTO | { error: string }>> => {
  try {
    const { searchParams } = request.nextUrl;
    const rawLocale = request.headers.get('Accept-Language') || defaultLocale;
    const locale = (rawLocale.split(',')[0].split('-')[0].trim().toLowerCase()) as AppLocale;

    const finalLocale = (locales.includes(locale) ? locale : defaultLocale);

    const result = await getProductsByParishId({
      parishId: searchParams.get('parishId') || '',
      page: parseInt(searchParams.get('page') || `${PAGINATION_PRODUCTS_DEFAULTS.PAGE}`),
      limit: parseInt(searchParams.get('limit') || `${PAGINATION_PRODUCTS_DEFAULTS.LIMIT}`),
      search: searchParams.get('search') || '',
      locale: finalLocale
    })

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Fetch products error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch products' },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest): Promise<NextResponse<ProductWithRelations | { error: string }>> => {
  try {
    const body: ProductCreate = await request.json();
    const newProduct = await createProduct(body);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
};
