import { prisma } from "@/shared/lib/prisma";
import { DeleteProductResult } from "../model/types";

export async function deleteProduct(id: string): Promise<DeleteProductResult> {
  try {
    return await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Prisma Error in deleteProduct:', error);
    throw error;
  }
}