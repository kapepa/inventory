import { AppLocale, PAGINATION_PARISHES_DEFAULTS } from '@/shared';
import { prisma } from '@/shared/lib/prisma';
import { FetchParishes, ResponseParishes, ParishWithRelations, ParishWithProducts } from '../model';
import { Prisma } from '@prisma/client';
import { getLocale } from 'next-intl/server';

export const getParishes = async ({
  page = PAGINATION_PARISHES_DEFAULTS.PAGE,
  limit = PAGINATION_PARISHES_DEFAULTS.LIMIT,
  search = '',
  locale: providedLocale
}: FetchParishes): Promise<ResponseParishes> => {
  const locale = providedLocale || (await getLocale()) as AppLocale;

  const where: Prisma.ParishWhereInput = search.trim() ? {
    translations: {
      some: {
        OR: [
          { title: { contains: search.trim(), mode: 'insensitive' } },
          { description: { contains: search.trim(), mode: 'insensitive' } }
        ]
      }
    }
  } : {};

  try {
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
  } catch (error) {
    console.error('Prisma Error in getParishes:', error);
    throw error;
  }
};

export const getParishById = async (
  { id, locale: providedLocale }: { id: string, locale?: AppLocale }
): Promise<ParishWithProducts | null> => {
  const locale = providedLocale || (await getLocale()) as AppLocale;
  try {
    const parish = await prisma.parish.findUnique({
      where: { id },
      include: {
        translations: {
          where: { locale }
        },
        _count: { select: { products: true } },
      }
    });

    if (!parish) return null;
    return parish;
  } catch (error) {
    console.error('Prisma Error in getParishById:', error);
    throw error;
  }
};