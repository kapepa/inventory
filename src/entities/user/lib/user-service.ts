import { Prisma } from '@prisma/client';
import { prisma } from "@/shared/lib/prisma";
import { PAGINATION_USERS_DEFAULTS } from '@/shared/constants/pagination';
import { FetchUsers, ResponseUsersDTO } from '../model/types';

const buildWhereClause = ({ search }: FetchUsers) => {
  const where: Prisma.UserWhereInput = {};
  if (search) where.name = {
    contains: search,
    startsWith: 'insensitive'
  };

  return where;
};

export async function getFilteredUsers({
  page = PAGINATION_USERS_DEFAULTS.PAGE,
  limit = PAGINATION_USERS_DEFAULTS.LIMIT,
  search,
}: FetchUsers,
): Promise<ResponseUsersDTO> {
  try {
    const where = buildWhereClause({ search });
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          imageUrl: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return {
      data,
      hasMore: skip + data.length < total,
      total
    };
  } catch (error) {
    console.error('Prisma Error in getFilteredUsers:', error);
    throw error;
  }
}