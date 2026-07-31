import { CACHE_ENTITIES, CACHE_TAGS } from '@/shared/constants/cache';
import { createCacheEntityTag, createCacheLocalizedPath } from '@/shared/lib/cache-utils';
import { AppLocale } from '@/shared/lib/i18n/config';
import { revalidateTag, revalidatePath } from 'next/cache';

export function invalidateParishesCacheList({ locale }: { locale: AppLocale }) {
  revalidateTag(CACHE_TAGS.PARISHES);
  revalidateTag(CACHE_TAGS.PARISHES_TOTALS);
  revalidatePath(createCacheLocalizedPath(locale, CACHE_TAGS.PARISHES));
}

export function invalidateParishCacheById({ id, locale }: { id: string, locale: AppLocale }) {
  revalidateTag(CACHE_TAGS.PARISHES);
  revalidateTag(CACHE_TAGS.PARISHES_TOTALS);
  revalidateTag(createCacheEntityTag(CACHE_ENTITIES.PARISH, id));
  revalidatePath(createCacheLocalizedPath(locale, CACHE_TAGS.PARISHES));
  revalidatePath(createCacheLocalizedPath(locale, `${CACHE_TAGS.PARISHES}/${id}`));
}