import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from '@/app/api/_middleware';
import { getLocaleFromRequest } from "@/shared/lib/get-locale-from-request";
import { PAGINATION_PRODUCTS_DEFAULTS } from "@/shared/constants";
import { ResponseProductsShortDTO } from "@/entities/product/model/types";
import { getFilteredProductsShortCached } from "@/entities/product/lib/product-service-cached";

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