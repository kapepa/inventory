
import { CACHE_ENTITIES, CACHE_TAGS } from '@/shared/constants/cache';
import { createCacheEntityTag, createCacheLocalizedPath } from '@/shared/lib/cache-utils';
import { AppLocale } from '@/shared/lib/i18n/config';
import { revalidateTag, revalidatePath } from 'next/cache';

export function invalidateCategoriesCacheList({ locale }: { locale: AppLocale }) {
  revalidateTag(CACHE_TAGS.CATEGORIES);
  revalidatePath(createCacheLocalizedPath(locale, CACHE_TAGS.CATEGORIES));
}

export function invalidateCategoryCacheById({ id, locale }: { id: string, locale: AppLocale }) {
  revalidateTag(CACHE_TAGS.CATEGORIES);
  revalidateTag(createCacheEntityTag(CACHE_ENTITIES.CATEGORY, id));
  revalidatePath(createCacheLocalizedPath(locale, CACHE_TAGS.CATEGORIES));
  revalidatePath(createCacheLocalizedPath(locale, `${CACHE_TAGS.CATEGORIES}/${id}`));
}

export function invalidateCategoriesByParishId({ parishId, locale }: { parishId: string, locale: AppLocale }) {
  revalidateTag(CACHE_TAGS.CATEGORIES_BY_PARISH_ID);
  revalidateTag(createCacheEntityTag(CACHE_ENTITIES.PARISH, parishId));
  revalidatePath(createCacheLocalizedPath(locale, CACHE_TAGS.CATEGORIES));
}