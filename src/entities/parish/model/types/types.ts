import { AppLocale } from '@/shared';
import { Parish, ParishTranslation } from '@prisma/client';

export interface FetchParishes {
  page: number
  limit: number
  search?: string
  locale?: AppLocale
}

export interface ParishWithRelations extends Parish {
  translations: ParishTranslation[];
  _count: { products: number };
}

export interface ParishWithRelationsTotals extends Parish {
  translations: ParishTranslation[];
  _count: { products: number };
  totals: {
    usd: number;
    uah: number;
  };
}

export interface FetchParishById {
  id: string,
  locale?: AppLocale,
  categoryId?: string,
  specification?: string
}