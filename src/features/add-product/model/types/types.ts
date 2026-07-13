import { Price, ProductTranslation } from "@prisma/client";
import { Product } from "@prisma/client";

export type ProductTranslationType = Pick<ProductTranslation, "locale" | "title" | "specification">
export type ProductPriceType = Pick<Price, "symbol" | "value">

export interface ProductCreate extends Omit<Product, 'id' | 'createdAt' | 'updatedAt'> {
  translations: ProductTranslationType[]
  prices: ProductPriceType[]
}

export interface PhotoFieldRef {
  clearImage: () => void
}
