import { Money } from "@prisma/client";
import { formatCurrency, Currency } from "@/shared/lib/currency";
import { ProductsWithRelations } from "../model";

export function getProductPrice(
  product: ProductsWithRelations,
  currency: Money
) {
  return product.prices.find(price => price.symbol === currency);
}

export function getProductPrimaryPrice(product: ProductsWithRelations) {
  return (
    product.prices.find(p => p.symbol === Money.USD) ||
    product.prices.find(p => p.symbol === Money.UAH) ||
    product.prices[0]
  );
}

export function formatProductPrice(
  product: ProductsWithRelations,
  currency?: Money
): string | null {
  const price = currency
    ? getProductPrice(product, currency)
    : getProductPrimaryPrice(product);

  if (!price) return null;

  return formatCurrency(price.value, price.symbol as Currency);
}
