import { getProductById } from "@/entities/server";
import { deleteFile } from "@/entities/server";
import { DeleteProductResult, MiddlewareUser } from "@/features";
import { deleteProduct } from "@/features/server";
import { apiHandler } from "@/shared/server";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = apiHandler(
  async (_: NextRequest, user: MiddlewareUser, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse<DeleteProductResult | { error: string }>> => {
    try {
      if (user?.role !== "ADMIN") return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      )

      const { id } = await params;
      const existProduct = await getProductById({ id })

      if (!existProduct) return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
      if (existProduct?.photo) {
        try {
          await deleteFile(existProduct.photo);
        } catch (deleteError) {
          console.error('Failed to delete photo, but continuing:', deleteError);
        }
      }

      const response = await deleteProduct(id);
      return NextResponse.json(response)
    } catch (error) {
      console.error('Delete product error:', error);
      return NextResponse.json(
        { error: 'Failed to delete product' },
        { status: 500 }
      );
    }
  })