import { prisma } from "@/shared/lib/prisma"
import { GetCategoriesParams } from "../model/types"

export const getCategories = async ({ locale }: GetCategoriesParams) => {
  const categories = await prisma.category.findMany({
    include: {
      translations: {
        where: {
          locale,
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  return categories
}