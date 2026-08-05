import { NextRequest, NextResponse } from 'next/server'
import { apiHandler } from '@/app/api/_middleware';
import { getLocaleFromRequest } from '@/shared/lib/get-locale-from-request';
import { PAGINATION_PRODUCTS_DEFAULTS } from '@/shared/constants/pagination';
import { AuthenticatedUser } from '@/features/auth/model/types';
import { ResponseProductsWideDTO } from '@/entities/product/model/types';
import { getFilteredProductsWide } from '@/entities/product/lib/product-service';

export const GET = apiHandler(async (
  request: NextRequest,
  _: AuthenticatedUser,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse<ResponseProductsWideDTO | { error: string }>> => {
  try {
    const { id: categoryId } = await params;
    const { searchParams } = request.nextUrl;
    const locale = getLocaleFromRequest(request);

    const response = await getFilteredProductsWide({
      parishId: '',
      page: parseInt(searchParams.get('page') || `${PAGINATION_PRODUCTS_DEFAULTS.PAGE}`),
      limit: parseInt(searchParams.get('limit') || `${PAGINATION_PRODUCTS_DEFAULTS.LIMIT}`),
      categoryId,
      search: searchParams.get('search') || '',
      specification: '',
      locale: locale
    })

    return NextResponse.json(response);
  } catch (error: unknown) {
    console.error('Failed to fetch categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
})