import { prisma } from '@/shared/lib/prisma';
import { DeleteAccountResult } from "../model/types";

export const deleteAccount = async (id: string): Promise<DeleteAccountResult> => {
  try {
    return await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    console.error('Prisma Error in deleteAccount:', error);
    throw error;
  }
};