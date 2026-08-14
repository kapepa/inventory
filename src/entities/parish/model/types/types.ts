import { AppLocale } from '@/shared/lib/i18n/config';
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

export type ParishesType = ParishWithRelations | ParishWithRelationsTotals

export interface ParishesState {
  total: number;
  page: number;
  activeParishe: ParishesType | null;
  newParishe: ParishesType | null;
  addNewParish: (parishe: ParishesType | null) => void;
  setTotal: (total: number) => void;
  setPage: (page: number) => void;
}

export interface TitleCellProps {
  label?: string,
  title: string,
  className?: string
}

export interface DetailsCellProps {
  label?: string,
  title?: string | null,
  description: string | null,
  className?: string
}