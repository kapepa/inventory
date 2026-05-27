import { PAGINATION_PARISHES_DEFAULTS } from '@/shared';
import { prisma } from '@/shared/lib/prisma';
import { GetParishesParams, GetParishesResponse } from '../model/types';

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

  const [data, total] = await Promise.all([
    prisma.parish.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        translations: {
          where: { locale }
        },
        _count: { select: { products: true } },
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.parish.count({ where })
  ]);

  return { data: data, total, hasMore: page * limit < total };
};