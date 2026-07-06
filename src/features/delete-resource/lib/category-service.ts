import { prisma } from '@/shared/lib/prisma';
import { DeleteCategoryResult } from "../model/types";

export const deleteCategory = async (id: string): Promise<DeleteCategoryResult> => {
  try {
    return await prisma.category.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Prisma Error in deleteCategory:', error);
    throw error;
  }
};