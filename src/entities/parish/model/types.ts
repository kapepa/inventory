import { AppLocale } from '@/shared';
import { Parish, ParishTranslation } from '@prisma/client';

export interface FetchParishes {
  page: number
  limit: number
  search?: string
  locale?: AppLocale;
}

export interface FetchParishesClient extends FetchParishes {
  signal?: AbortSignal,
}

export interface DeleteParishesClient {
  id: string,
  signal?: AbortSignal,
}


export interface ParishWithRelations extends Parish {
  translations: ParishTranslation[];
  _count: { products: number };
  totals: {
    usd: number;
    uah: number;
  };
}

export interface ResponseParishes {
  data: ParishWithRelations[];
  total: number;
  hasMore: boolean;
}
