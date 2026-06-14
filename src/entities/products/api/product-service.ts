import { prisma } from '@/shared/lib/prisma';
import { FetchProducts, ResponseProductsDTO } from '../model';
import { PAGINATION_PRODUCTS_DEFAULTS } from '@/shared';
import { Product } from '@prisma/client';

export async function getProductsByParishId({
  parishId,
  page = PAGINATION_PRODUCTS_DEFAULTS.PAGE,
  limit = PAGINATION_PRODUCTS_DEFAULTS.LIMIT,
  locale
}: FetchProducts,
): Promise<ResponseProductsDTO> {
  try {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.product.findMany({
        where: { parishId },
        include: {
          translations: { where: { locale } },
          prices: {
            select: {
              value: true,
              symbol: true
            }
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
    };
  } catch (error) {
    console.error('Prisma Error in getProductsByParishId:', error);
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