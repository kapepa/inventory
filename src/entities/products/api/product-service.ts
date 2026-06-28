import { prisma } from '@/shared/server';
import { FetchProducts, ResponseProductsShortDTO, ResponseProductsWideDTO } from '../model';
import { PAGINATION_PRODUCTS_DEFAULTS } from '@/shared';
import { Prisma, Product } from '@prisma/client';

const buildWhereClause = ({ search, parishId, categoryId, specification, locale }: FetchProducts) => {
  const where: Prisma.ProductWhereInput = {};
  if (parishId) where.parishId = parishId;
  if (categoryId) where.categoryId = categoryId;

  if (search) {
    where.translations = {
      some: {
        locale,
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    };
  }

  if (specification) {
    where.translations = {
      some: {
        locale,
        specification: {
          contains: specification,
          mode: 'insensitive',
        },
      },
    };
  }

  return where;
};

export async function getFilteredProductsWide(params: FetchProducts): Promise<ResponseProductsWideDTO> {
  const { page = PAGINATION_PRODUCTS_DEFAULTS.PAGE, limit = PAGINATION_PRODUCTS_DEFAULTS.LIMIT, locale } = params;

  try {
    const skip = (page - 1) * limit;
    const where = buildWhereClause(params);

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          translations: {
            where: { locale },
            select: { title: true, specification: true }
          },
          prices: {
            select: { value: true, symbol: true }
          },
          category: {
            select: {
              id: true,
              translations: {
                where: { locale },
                select: { title: true }
              }
            }
          },
          user: {
            select: {
              id: true,
              name: true,
            }
          },
          rental: {
            select: {
              startDate: true,
              endDate: true,
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      data,
      total,
      hasMore: skip + data.length < total,
    };
  } catch (error) {
    console.error('Prisma Error in getFilteredProductsWide:', error);
    throw error;
  }
}

export async function getFilteredProductsShort({
  parishId,
  page = PAGINATION_PRODUCTS_DEFAULTS.PAGE,
  limit = PAGINATION_PRODUCTS_DEFAULTS.LIMIT,
  locale
}: FetchProducts,
): Promise<ResponseProductsShortDTO> {
  try {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where: { parishId },
        include: {
          translations: {
            where: { locale },
            select: { title: true, specification: true }
          },
          prices: {
            select: { value: true, symbol: true }
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.product.count({ where: { parishId } }),
    ]);

    return {
      data,
      hasMore: skip + data.length < total,
      total
    };
  } catch (error) {
    console.error('Prisma Error in getFilteredProductsShort:', error);
    throw error;
  }
}

export async function getProductById({ id }: { id: string }): Promise<Product | null> {
  try {
    return await prisma.product.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error('Prisma Error in getProductById:', error);
    throw error;
  }
}