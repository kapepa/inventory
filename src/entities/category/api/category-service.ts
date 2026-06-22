import { prisma } from "@/shared/server"
import { CategoryWithTranslations, GetCategoriesByParishIdParams, GetCategoriesParams } from "../model/types"

export const getCategories = async ({ locale }: GetCategoriesParams): Promise<CategoryWithTranslations[]> => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        translations: {
          where: {
            locale,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return categories
  } catch (error) {
    console.error('Prisma Error in getCategories:', error);
    throw error;
  }
}

export const getCategoriesByParishId = async ({ id, locale }: GetCategoriesByParishIdParams): Promise<CategoryWithTranslations[]> => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        products: {
          some: {
            parishId: id,
          }
        }
      },
      include: {
        translations: {
          where: {
            locale,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return categories
  } catch (error) {
    console.error('Prisma Error in getCategoriesByParishId:', error);
    throw error;
  }
}