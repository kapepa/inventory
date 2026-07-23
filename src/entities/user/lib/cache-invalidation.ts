import { AppLocale } from '@/shared';
import { CACHE_ENTITIES, createCacheEntityTag, createCacheLocalizedPath } from '@/shared/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export function invalidateUsersCacheList({ locale }: { locale: AppLocale }) {
  revalidateTag(CACHE_ENTITIES.USER);
  revalidatePath(createCacheLocalizedPath(locale, CACHE_ENTITIES.USER));
}

export function invalidateUserCacheById({ id, locale }: { id: string, locale: AppLocale }) {
  revalidateTag(CACHE_ENTITIES.USER);
  revalidateTag(createCacheEntityTag(CACHE_ENTITIES.USER, id));
  revalidatePath(createCacheLocalizedPath(locale, CACHE_ENTITIES.USER));
  revalidatePath(createCacheLocalizedPath(locale, `${CACHE_ENTITIES.USER}/${id}`));
}