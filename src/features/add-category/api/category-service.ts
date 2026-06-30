import { prisma } from '@/shared/lib/prisma';
import { categoryCreateServerSchema, CategoryFormValues } from '../model';
import { CategoryWithProductCount } from '@/entities';
import { CategoryAlreadyExistsError } from '../server';

export const createCategory = async (data: CategoryFormValues): Promise<CategoryWithProductCount> => {
  const validated = categoryCreateServerSchema.parse(data)
  try {
    const titles = Object.values(validated.translations).map(t => t.title);

    const existingCategory = await prisma.category.findFirst({
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

    if (existingCategory) {
      throw new CategoryAlreadyExistsError();
    }

    const category = await prisma.category.create({
      data: {
        translations: {
          create: validated.translations,
        },
      },
      include: {
        translations: true,
        _count: { select: { products: true } }
      },
    });

    return category;
  } catch (error) {
    if (error instanceof CategoryAlreadyExistsError) {
      throw error;
    }
    console.log('Prisma Error in createCategory:', error);
    throw error;
  }
};