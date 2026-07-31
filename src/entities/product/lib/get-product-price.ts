import { Money } from "@prisma/client";
import { formatCurrency, Currency } from "@/shared/lib/currency";
import { ProductWithRelationsShort, ProductWithRelationsWide } from "../model/types";

type ProductType = ProductWithRelationsShort | ProductWithRelationsWide

export function getProductPrice(
  product: ProductType,
  currency: Money
) {
  return product.prices.find(price => price.symbol === currency);
}

export function getProductPrimaryPrice(product: ProductType) {
  return (
    product.prices.find(p => p.symbol === Money.USD) ||
    product.prices.find(p => p.symbol === Money.UAH) ||
    product.prices[0]
  );
}

export function formatProductPrice(
  product: ProductType,
  currency?: Money
): string | null {
  const price = currency
    ? getProductPrice(product, currency)
    : getProductPrimaryPrice(product);

  if (!price) return null;

  return formatCurrency(price.value, price.symbol as Currency);
}
