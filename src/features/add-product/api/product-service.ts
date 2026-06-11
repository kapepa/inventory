import { prisma } from "@/shared/lib/prisma";
import { ProductCreate, ProductWithRelations } from "../model";


export const createProduct = async (body: ProductCreate): Promise<ProductWithRelations> => {
  try {
    const newProduct = await prisma.product.create({
      data: {
        serialNumber: body.serialNumber,
        order: body.order,
        status: body.status,
        isNew: body.isNew,
        photo: body.photo,
        parishId: body.parishId,
        translations: {
          create: body.translations,
        },
        prices: {
          create: body.prices,
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