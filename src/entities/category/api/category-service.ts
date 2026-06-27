import { prisma } from "@/shared/server"
import { CategoryWithTranslations, FetchCategories, GetCategoriesByParishIdParams, GetCategoriesParams, GetCategoriesWithProductCountDTO } from "../model/types"
import { PAGINATION_CATEGORIES_DEFAULTS } from "@/shared"

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

export const getCategoriesWithProductCount = async (params: FetchCategories): Promise<GetCategoriesWithProductCountDTO> => {
  const { page = PAGINATION_CATEGORIES_DEFAULTS.PAGE, limit = PAGINATION_CATEGORIES_DEFAULTS.LIMIT, locale } = params;
  try {
    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        include: {
          translations: {
            where: {
              locale,
            },
          },
          _count: {
            select: {
              products: true,
            },
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.category.count()
    ])

    return { data: categories, total, hasMore: page * limit < total };
  } catch (error) {
    console.error('Prisma Error in getCategoriesWithProductCount:', error);
    throw error;
  }
};