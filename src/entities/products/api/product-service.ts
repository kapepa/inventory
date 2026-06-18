import { prisma } from '@/shared/lib/prisma';
import { FetchProducts, ResponseProductsShortDTO, ResponseProductsWideDTO } from '../model';
import { PAGINATION_PRODUCTS_DEFAULTS } from '@/shared';
import { Product } from '@prisma/client';

export async function getProductsWideByParishId({
  parishId,
  page = PAGINATION_PRODUCTS_DEFAULTS.PAGE,
  limit = PAGINATION_PRODUCTS_DEFAULTS.LIMIT,
  locale
}: FetchProducts,
): Promise<ResponseProductsWideDTO> {
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
              name: true
            }
          }
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
    console.error('Prisma Error in getProductsWideByParishId:', error);
    throw error;
  }
}

export async function getProductsShortByParishId({
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
    };
  } catch (error) {
    console.error('Prisma Error in getProductsShortByParishId:', error);
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