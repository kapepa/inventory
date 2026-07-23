import { getProductById, deleteFile, invalidateProductCacheById } from "@/entities/server";
import { DeleteProductResult } from "@/features";
import { deleteProduct, AuthenticatedUser } from "@/features/server";
import { ForbiddenError, getLocaleFromRequest, NotFoundError } from "@/shared/server";
import { NextRequest, NextResponse } from "next/server";
import { apiHandler } from '@/app/api/_middleware';

export const DELETE = apiHandler(
  async (request: NextRequest, user: AuthenticatedUser, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse<DeleteProductResult | { error: string }>> => {
    try {
      if (user?.role !== "ADMIN") throw new ForbiddenError('Admin access required');

      const { id } = await params;
      const existProduct = await getProductById({ id })

      if (!existProduct) throw new NotFoundError('Product');
      if (existProduct?.photo) {
        try {
          await deleteFile(existProduct.photo);
        } catch (deleteError) {
          console.error('Failed to delete photo, but continuing:', deleteError);
        }
      }

      const response = await deleteProduct(id);

      const locale = getLocaleFromRequest(request);
      invalidateProductCacheById({ id, locale })

      return NextResponse.json(response)
    } catch (error: unknown) {

      if (error instanceof ForbiddenError) {
        return NextResponse.json(
          { error: error.message },
          { status: 403 }
        );
      }

      if (error instanceof NotFoundError) {
        return NextResponse.json(
          { error: error.message },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      );
    }
  })