import { prisma } from "@/shared/server"
import { CategoryWithTranslations, GetCategoriesParams } from "../model/types"

export const getCategories = async ({ locale }: GetCategoriesParams): Promise<CategoryWithTranslations[]> => {
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