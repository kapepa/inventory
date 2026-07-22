import { ProductWithRelationsShort, ProductWithRelationsWide } from "./types";

export const hasParish = (
  product: ProductWithRelationsShort | ProductWithRelationsWide
): product is ProductWithRelationsWide & { parish: NonNullable<ProductWithRelationsWide['parish']> } => {
  return 'parish' in product && product.parish != null;
};

export const hasCategory = (
  product: ProductWithRelationsShort | ProductWithRelationsWide
): product is ProductWithRelationsWide & { category: NonNullable<ProductWithRelationsWide['category']> } => {
  return 'category' in product && product.category != null;
};

export const hasRental = (
  product: ProductWithRelationsShort | ProductWithRelationsWide
): product is ProductWithRelationsWide & { rental: NonNullable<ProductWithRelationsWide['rental']> } => {
  return 'rental' in product && product.rental != null;
};

export const hasUser = (
  product: ProductWithRelationsShort | ProductWithRelationsWide
): product is ProductWithRelationsWide & { rental: NonNullable<ProductWithRelationsWide['user']> } => {
  return 'user' in product && product.user != null;
};