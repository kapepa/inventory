import { prisma } from '@/shared/server';
import { ParishFormValues } from '../model';
import { ParishWithRelationsTotals } from '@/entities';
import { AlreadyExistsError } from '@/shared';
import { parishCreateServerSchema } from '../server';

export const createParish = async (data: ParishFormValues): Promise<ParishWithRelationsTotals> => {
  const validated = parishCreateServerSchema.parse(data)
  try {
    const titles = Object.values(validated.translations).map(t => t.title);

    const existingParish = await prisma.parish.findFirst({
      where: {
        translations: {
          some: {
            title: {
              in: titles,
            }
          }
        }
      }
    });

    if (existingParish) throw new AlreadyExistsError("Parish");

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
    if (error instanceof AlreadyExistsError) {
      throw error;
    }

    console.log('Prisma Error in createParish:', error);
    throw error;
  }
};