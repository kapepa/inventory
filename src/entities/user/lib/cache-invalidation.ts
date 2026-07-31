import { CACHE_ENTITIES, CACHE_TAGS } from '@/shared/constants/cache';
import { createCacheEntityTag, createCacheLocalizedPath } from '@/shared/lib/cache-utils';
import { AppLocale } from '@/shared/lib/i18n/config';
import { revalidateTag, revalidatePath } from 'next/cache';

export function invalidateUsersCacheList({ locale }: { locale: AppLocale }) {
  revalidateTag(CACHE_ENTITIES.USER);
  revalidatePath(createCacheLocalizedPath(locale, CACHE_ENTITIES.USER));
}

export function invalidateUserCacheById({ id, locale }: { id: string, locale: AppLocale }) {
  revalidateTag(CACHE_TAGS.SESSION)
  revalidateTag(CACHE_ENTITIES.USER);
  revalidateTag(createCacheEntityTag(CACHE_ENTITIES.USER, id));
  revalidatePath(createCacheLocalizedPath(locale, CACHE_ENTITIES.USER));
  revalidatePath(createCacheLocalizedPath(locale, `${CACHE_ENTITIES.USER}/${id}`));
}