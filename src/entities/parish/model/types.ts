import { LocalesLanguages } from '@/shared';
import { Parish, ParishTranslation } from '@prisma/client';

export interface FetchParishesParams {
  page: number
  limit: number
  search?: string
  signal?: AbortSignal
}

export interface GetParishesParams {
  page?: number;
  limit?: number;
  search?: string;
  locale: LocalesLanguages;
}

export interface ParishWithRelations extends Parish {
  translations: ParishTranslation[];
  _count: { products: number };
}

export interface GetParishesResponse {
  data: ParishWithRelations[];
  total: number;
  hasMore: boolean;
}
