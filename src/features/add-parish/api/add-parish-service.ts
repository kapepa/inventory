import { prisma } from '@/shared/lib/prisma';
import { parishCreateServerSchema, ParishWithRelations } from '../model';

export const createParish = async (data: any): Promise<ParishWithRelations> => {
  const validated = parishCreateServerSchema.parse(data)
  try {
    const parish = await prisma.parish.create({
      data: {
        deliveryDate: validated.deliveryDate ? new Date(validated.deliveryDate) : null,
        translations: {
          create: validated.translations,
        },
      },
      include: {
        translations: true,
        _count: { select: { products: true } }
      },
    });

    return {
      ...parish,
      totals: { usd: 0, uah: 0 }
    };
  } catch (error) {
    console.error('Prisma Error in createParish:', error);
    throw error;
  }
};