import { Money } from "@prisma/client";
import { formatUAH, formatUSD } from "./currency";

export function getProductPrice(
  prices: { symbol: Money; value: number }[],
  currency: Money = Money.UAH
) {
  return prices.find(price => price.symbol === currency)?.value;
}

export function getProductPrimaryPrice<T extends { symbol: Money; value: number }>(prices: T[]) {
  const getValueUAH = getProductPrice(prices, Money.UAH);
  const getValueUSD = getProductPrice(prices, Money.USD);
  return {
    [Money.UAH]: getValueUAH ? formatUAH(getValueUAH) : getValueUAH,
    [Money.USD]: getValueUSD ? formatUSD(getValueUSD) : getValueUSD,
  };
}