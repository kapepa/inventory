import { AppLocale } from '@/shared';
import { Parish, ParishTranslation } from '@prisma/client';

export interface DeleteParishesParams {
  id: string,
  signal?: AbortSignal,
}

export interface FetchParishesParams {
  page: number
  limit: number
  search?: string
  signal?: AbortSignal,
}

export interface GetParishesParams {
  page?: number;
  limit?: number;
  search?: string;
  locale: AppLocale;
}

export interface ParishWithRelations extends Parish {
  translations: ParishTranslation[];
  _count: { products: number };
  totals: {
    usd: number;
    uah: number;
  };
}

export interface GetParishesResponse {
  data: ParishWithRelations[];
  total: number;
  hasMore: boolean;
}
