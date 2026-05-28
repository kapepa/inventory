export type Currency = 'USD' | 'UAH';

const CURRENCY_LOCALES: Record<Currency, string> = {
  USD: 'en-US',
  UAH: 'uk-UA',
};

export const formatCurrency = (value: number, currency: Currency): string => {
  return new Intl.NumberFormat(CURRENCY_LOCALES[currency], {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatUSD = (value: number) => formatCurrency(value, 'USD');
export const formatUAH = (value: number) => formatCurrency(value, 'UAH');