import { prisma } from '@/shared/lib/prisma';
import { AlreadyExistsError } from '@/shared/lib/server';
import { CategoryWithProductCount } from '@/entities/category/model/types';
import { CategoryFormValues } from '../model/schemas-client';
import { categoryCreateServerSchema } from '../model/schemas-server';

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
      throw new AlreadyExistsError("Category");
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
    if (error instanceof AlreadyExistsError) {
      throw error;
    }
    console.log('Prisma Error in createCategory:', error);
    throw error;
  }
};