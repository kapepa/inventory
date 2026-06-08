import { Price, ProductTranslation } from "@prisma/client";

export type ProductTranslationType = Pick<ProductTranslation, "locale" | "title" | "specification">
export type ProductPriceType = Pick<Price, "symbol" | "value">