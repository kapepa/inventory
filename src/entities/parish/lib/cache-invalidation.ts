import { AppLocale } from '@/shared';
import { CACHE_ENTITIES, CACHE_TAGS, createCacheEntityTag, createCacheLocalizedPath } from '@/shared/server';
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