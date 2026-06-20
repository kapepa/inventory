import { ProductWithRelationsShort, ProductWithRelationsWide } from "./types";

export const hasCategory = (
  product: ProductWithRelationsShort | ProductWithRelationsWide
): product is ProductWithRelationsWide & { category: NonNullable<ProductWithRelationsWide['category']> } => {
  return 'category' in product && product.category != null;
};