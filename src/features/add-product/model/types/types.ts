import { AppLocale } from "@/shared/lib/i18n/config";
import { Price, ProductTranslation } from "@prisma/client";
import { Product } from "@prisma/client";

export type ProductTranslationType = Pick<ProductTranslation, "locale" | "title" | "specification">
export type ProductPriceType = Pick<Price, "symbol" | "value">

export interface ProductCreateInput extends Omit<Product, 'id' | 'createdAt' | 'updatedAt'> {
  translations: ProductTranslationType[]
  prices: ProductPriceType[]
}

export interface PhotoFieldRef {
  clearImage: () => void
}

export interface ProductMutationContext {
  input: ProductCreateInput,
  locale: AppLocale
}