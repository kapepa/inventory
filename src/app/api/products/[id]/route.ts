import { getProductById, deleteFile } from "@/entities/server";
import { DeleteProductResult, AuthenticatedUser } from "@/features";
import { deleteProduct } from "@/features/server";
import { apiHandler, ForbiddenError, NotFoundError } from "@/shared/server";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = apiHandler(
  async (_: NextRequest, user: AuthenticatedUser, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse<DeleteProductResult | { error: string }>> => {
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