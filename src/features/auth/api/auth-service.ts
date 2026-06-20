import { prisma } from "@/shared/lib/prisma";
import { MiddlewareUser } from "../model/types";

export const authorizeRequest = async ({ id, email }: { id?: string, email?: string }): Promise<MiddlewareUser | null> => {
  try {
    return await prisma.user.findFirst({
      where: { OR: [{ id }, { email }] },
      select: {
        id: true,
        name: true,
        role: true,
        email: true
      }
    });
  } catch (error) {
    console.error('Prisma Error in authorizeRequest:', error);
    throw error;
  }
}