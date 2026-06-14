import { Price, ProductTranslation } from "@prisma/client";
import { Product } from "@prisma/client";
import { ProductWithRelations } from "@/entities";

export type { ProductWithRelations };

export type ProductTranslationType = Pick<ProductTranslation, "locale" | "title" | "specification">
export type ProductPriceType = Pick<Price, "symbol" | "value">

export interface ProductCreate extends Omit<Product, 'id' | 'createdAt' | 'updatedAt'> {
  translations: ProductTranslationType[]
  prices: ProductPriceType[]
}
