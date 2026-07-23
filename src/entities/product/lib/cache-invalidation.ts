import { AppLocale } from '@/shared';
import { CACHE_ENTITIES, CACHE_TAGS, createCacheEntityTag, createCacheLocalizedPath } from '@/shared/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export function invalidateProductCacheList({ locale }: { locale: AppLocale }) {
  revalidateTag(CACHE_TAGS.PRODUCTS);
  revalidatePath(createCacheLocalizedPath(locale, CACHE_TAGS.PRODUCTS));
}

export function invalidateProductCacheById({ id, locale }: { id: string, locale: AppLocale }) {
  revalidateTag(CACHE_TAGS.PRODUCTS);
  revalidateTag(createCacheEntityTag(CACHE_ENTITIES.PRODUCT, id));
  revalidatePath(createCacheLocalizedPath(locale, CACHE_TAGS.PRODUCTS));
}

export function invalidateProductDetailCache({ id, locale }: { id: string, locale: AppLocale }) {
  revalidateTag(createCacheEntityTag(CACHE_ENTITIES.PRODUCT, id));
  revalidatePath(createCacheLocalizedPath(locale, `${CACHE_TAGS.PRODUCTS}/${id}`));
}