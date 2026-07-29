import { AlreadyExistsError, prisma } from "@/shared/server";
import { ProductCreate } from "../model";
import { ProductWithRelationsShort } from "@/entities";
import { productCreateServerSchema } from "../model/schemas-server";

export const createProduct = async (body: ProductCreate): Promise<ProductWithRelationsShort> => {
  const validated = productCreateServerSchema.parse(body)
  try {
    const titles = Object.values(validated.translations).map(t => t.title);

    const existingProduct = await prisma.product.findFirst({
      where: {
        translations: {
          some: {
            title: {
              in: titles,
            }
          }
        }
      }
    });

    if (existingProduct) throw new AlreadyExistsError("Product");

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
    if (error instanceof AlreadyExistsError) {
      throw error;
    }

    console.error('Prisma Error in createProduct:', error);
    throw error;
  }
}