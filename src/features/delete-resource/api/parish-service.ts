import { prisma } from '@/shared/lib/prisma';
import { DeleteParishResult } from "../model/types";

export const deleteParish = async (id: string): Promise<DeleteParishResult> => {
  try {
    return await prisma.parish.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Prisma Error in createParish:', error);
    throw error;
  }
};