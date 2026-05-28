import { PAGINATION_PARISHES_DEFAULTS } from '@/shared';
import { prisma } from '@/shared/lib/prisma';
import { GetParishesParams, GetParishesResponse, ParishWithRelations } from '../model/types';

export const getParishes = async ({
  page = PAGINATION_PARISHES_DEFAULTS.PAGE,
  limit = PAGINATION_PARISHES_DEFAULTS.LIMIT,
  search = '',
  locale,
}: GetParishesParams): Promise<GetParishesResponse> => {
  const where = search ? {
    OR: [
      { name: { contains: search, mode: 'insensitive' as const } },
      { description: { contains: search, mode: 'insensitive' as const } },
      {
        translations: {
          some: {
            locale,
            title: { contains: search, mode: 'insensitive' as const }
          }
        }
      }
    ]
  } : {};

  const [parishes, total] = await Promise.all([
    prisma.parish.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        translations: {
          where: { locale }
        },
        _count: { select: { products: true } },
        products: {
          select: {
            prices: {
              select: {
                value: true,
                symbol: true
              }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.parish.count({ where })
  ]);

  const data: ParishWithRelations[] = parishes.map((parish) => {
    const allPrices = parish.products.flatMap(product => product.prices);
    const totals = {
      usd: allPrices
        .filter(p => p.symbol === 'USD')
        .reduce((sum, p) => sum + p.value, 0),
      uah: allPrices
        .filter(p => p.symbol === 'UAH')
        .reduce((sum, p) => sum + p.value, 0),
    };

    const { products, ...rest } = parish;
    return { ...rest, totals };
  });

  return { data, total, hasMore: page * limit < total };
};

export const deleteParish = async (id: string) => {
  return await prisma.parish.delete({
    where: { id },
  });
};