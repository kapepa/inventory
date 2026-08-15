import { PAGINATION_PARISHES_DEFAULTS } from '@/shared/constants/pagination';
import { Prisma } from '@prisma/client';
import { getLocale } from 'next-intl/server';
import { prisma } from '@/shared/lib/prisma';
import { AppLocale } from '@/shared/lib/i18n/config';
import { FetchParishById, FetchParishes, ParishWithRelations, ResponseParishesDTO, ResponseParishesTotalsDTO } from '../model/types';

const buildWhereClause = ({ search = "" }: FetchParishes) => {
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

  return where;
};

export const getParishesTotals = async (params: FetchParishes): Promise<ResponseParishesTotalsDTO> => {
  const { page = PAGINATION_PARISHES_DEFAULTS.PAGE, limit = PAGINATION_PARISHES_DEFAULTS.LIMIT, locale } = params;
  try {
    const skip = (page - 1) * limit;
    const where = buildWhereClause(params);

    const [parishes, total] = await Promise.all([
      prisma.parish.findMany({
        where,
        include: {
          translations: { where: { locale } },
          _count: { select: { products: true } },
          products: {
            select: {
              prices: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.parish.count({ where })
    ]);

    if (total === 0 || parishes.length === 0) {
      return { data: [], total: 0, hasMore: false };
    }

    const data = parishes.map((parish) => {
      const allPrices = parish.products.flatMap(p => p.prices);
      const totals = {
        usd: allPrices.filter(p => p.symbol === 'USD').reduce((sum, p) => sum + p.value, 0),
        uah: allPrices.filter(p => p.symbol === 'UAH').reduce((sum, p) => sum + p.value, 0),
      };
      const { products, ...rest } = parish;
      return { ...rest, totals };
    });

    return { data, total, hasMore: page * limit < total };
  } catch (error) {
    console.error('Prisma Error in getParishesWide:', error);
    throw error;
  }
}

export const getParishes = async (params: FetchParishes): Promise<ResponseParishesDTO> => {
  const { page = PAGINATION_PARISHES_DEFAULTS.PAGE, limit = PAGINATION_PARISHES_DEFAULTS.LIMIT, locale } = params;
  try {
    const skip = (page - 1) * limit;
    const where = buildWhereClause(params);

    const [parishes, total] = await Promise.all([
      prisma.parish.findMany({
        where,
        include: {
          translations: {
            where: { locale }
          },
          _count: { select: { products: true } },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.parish.count()
    ]);

    if (total === 0 || parishes.length === 0) {
      return { data: [], total: 0, hasMore: false };
    }

    return { data: parishes, total, hasMore: page * limit < total };
  } catch (error) {
    console.error('Prisma Error in getParishes:', error);
    throw error;
  }
};

export const getParishById = async (
  params: FetchParishById
): Promise<ParishWithRelations | null> => {
  const locale = params.locale || (await getLocale()) as AppLocale;

  try {
    const parish = await prisma.parish.findUnique({
      where: { id: params.id },
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