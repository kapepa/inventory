import { prisma } from '@/shared/lib/prisma';
import { AlreadyExistsError } from '@/shared/lib/server';
import { CategoryWithProductCount } from '@/entities/category/model/types';
import { categoryCreateServerSchema } from '../model/schemas-server';
import { CategoryMutationContext } from '../model/types';

export const createCategory = async ({ input, locale }: CategoryMutationContext): Promise<CategoryWithProductCount> => {
  const validated = categoryCreateServerSchema.parse(input)
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
        translations: {
          where: { locale }
        },
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