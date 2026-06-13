import { prisma } from "@/shared/lib/prisma";
import { ProductCreate, productCreateServerSchema, ProductWithRelations } from "../model";

export const createProduct = async (body: ProductCreate): Promise<ProductWithRelations> => {
  const validated = productCreateServerSchema.parse(body)
  try {
    const newProduct = await prisma.product.create({
      data: {
        serialNumber: validated.serialNumber,
        order: validated.order,
        status: validated.status,
        isNew: validated.isNew,
        photo: validated.photo,
        parishId: validated.parishId,
        categoryId: validated.categoryId,
        translations: {
          create: validated.translations,
        },
        prices: {
          create: validated.prices,
        },
      },
      include: {
        translations: true,
        prices: true,
      },
    })

    return newProduct;
  } catch (error) {
    console.error('Prisma Error in createProduct:', error);
    throw error;
  }
}