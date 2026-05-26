import { prisma } from '@/shared/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';

    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { description: { contains: search, mode: 'insensitive' as const } },
        {
          translations: {
            some: {
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
          translations: true,
          _count: {
            select: { products: true }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.parish.count({ where })
    ]);

    const hasMore = page * limit < total;

    return NextResponse.json({
      data,
      total,
      hasMore,
    });
  } catch (error) {
    console.error('Fetch parishes error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch parishes' },
      { status: 500 }
    );
  }
};