import { unstable_cache } from 'next/cache';
import {
  getCategories,
  getCategoriesByParishId,
  getCategoriesWithProductCount,
  getCategoryById
} from './category-service';
import { FetchCategories, FetchCategoryById, GetCategoriesByParishIdParams, GetCategoriesParams } from '../model/types';
import { createCacheEntityTag, createCacheKey } from '@/shared/lib/cache-utils';
import { CACHE_ENTITIES, CACHE_REVALIDATE, CACHE_TAGS } from '@/shared/constants/cache';
import { PAGINATION_PRODUCTS_DEFAULTS } from '@/shared/constants/pagination';

export const getCategoriesCached = (params: GetCategoriesParams) => {
  const cacheKey = createCacheKey(
    CACHE_TAGS.CATEGORIES,
    params.locale
  );

  return unstable_cache(
    async () => getCategories(params),
    [cacheKey],
    {
      revalidate: CACHE_REVALIDATE.SLOW,
      tags: [CACHE_TAGS.CATEGORIES]
    }
  )();
};


export const getCategoriesByParishIdCached = (params: GetCategoriesByParishIdParams) => {
  const cacheKey = createCacheKey(
    CACHE_TAGS.CATEGORIES_BY_PARISH_ID,
    params.id,
    params.locale
  );

  return unstable_cache(
    async () => getCategoriesByParishId(params),
    [cacheKey],
    {
      revalidate: CACHE_REVALIDATE.NORMAL,
      tags: [
        CACHE_TAGS.CATEGORIES,
        CACHE_TAGS.CATEGORIES_BY_PARISH_ID,
        createCacheEntityTag(CACHE_ENTITIES.PARISH, params.id)
      ]
    }
  )();
};

export const getCategoriesWithProductCountCached = (params: FetchCategories) => {
  const cacheKey = createCacheKey(
    CACHE_TAGS.CATEGORIES_PRODUCTS_COUNT,
    params.page || PAGINATION_PRODUCTS_DEFAULTS.PAGE,
    params.search || 'all',
    params.locale!
  );

  return unstable_cache(
    async () => getCategoriesWithProductCount(params),
    [cacheKey],
    {
      revalidate: CACHE_REVALIDATE.NORMAL,
      tags: [
        CACHE_TAGS.CATEGORIES,
        CACHE_TAGS.CATEGORIES_PRODUCTS_COUNT
      ]
    }
  )();
};

export const getCategoryByIdCached = (params: FetchCategoryById) => {
  const cacheKey = createCacheKey(
    CACHE_ENTITIES.CATEGORY,
    params.id,
    params.locale || 'default'
  );
  const entityTag = createCacheEntityTag(CACHE_ENTITIES.CATEGORY, params.id);

  return unstable_cache(
    async () => getCategoryById(params),
    [cacheKey],
    {
      revalidate: CACHE_REVALIDATE.NORMAL,
      tags: [CACHE_TAGS.CATEGORIES, entityTag]
    }
  )();
};