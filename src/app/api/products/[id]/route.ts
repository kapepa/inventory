import { getProductById } from "@/entities/products/api/product-service";
import { deleteFile } from "@/entities/upload/api/upload-service";
import { DeleteProductResult } from "@/features";
import { deleteProduct } from "@/features/delete-resource/api/product-service";
import { apiHandler } from "@/shared";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = apiHandler(
  async (_: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse<DeleteProductResult | { error: string }>> => {
    try {
      const { id } = await params;
      const getProuct = await getProductById({ id })

      if (!getProuct) return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      if (getProuct?.photo) await deleteFile(getProuct?.photo)

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