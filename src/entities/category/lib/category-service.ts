import { PAGINATION_CATEGORIES_DEFAULTS } from "@/shared/constants";
import { CategoryWithProductCount, CategoryWithTranslations, FetchCategories, FetchCategoryById, GetCategoriesByParishIdParams, GetCategoriesParams, GetCategoriesWithProductCountDTO } from "../model/types"
import { prisma } from "@/shared/lib/prisma";
import { Prisma } from "@prisma/client";
import { getLocale } from "next-intl/server";
import { AppLocale } from "@/shared/lib/i18n/config";

const buildWhereClause = ({ search = "" }: FetchCategories) => {
  const where: Prisma.CategoryWhereInput = search.trim() ? {
    translations: {
      some: {
        OR: [
          { title: { contains: search.trim(), mode: 'insensitive' } },
        ]
      }
    }
  } : {};

  return where;
};

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
    const where = buildWhereClause(params);

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where,
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
      prisma.category.count({ where })
    ])

    return { data: categories, total, hasMore: page * limit < total };
  } catch (error) {
    console.error('Prisma Error in getCategoriesWithProductCount:', error);
    throw error;
  }
};

export const getCategoryById = async (params: FetchCategoryById): Promise<CategoryWithProductCount | null> => {
  const locale = params.locale || (await getLocale()) as AppLocale;

  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: {
        translations: {
          where: { locale }
        },
        _count: { select: { products: true } },
      }
    });

    if (!category) return null;
    return category
  } catch (error) {
    console.error('Prisma Error in getCategoryhById:', error);
    throw error;
  }
}