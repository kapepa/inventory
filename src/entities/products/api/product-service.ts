import { prisma } from '@/shared/lib/prisma';
import { FetchProducts, ResponseProducts } from '../model';
import { PAGINATION_PRODUCTS_DEFAULTS } from '@/shared';

export async function getProductsByParishId({
  parishId,
  page = PAGINATION_PRODUCTS_DEFAULTS.PAGE,
  limit = PAGINATION_PRODUCTS_DEFAULTS.LIMIT,
  locale
}: FetchProducts,
): Promise<ResponseProducts> {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.product.findMany({
      where: { parishId },
      include: {
        translations: { where: { locale } },
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
}