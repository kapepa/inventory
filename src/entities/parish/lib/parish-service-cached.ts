import { unstable_cache } from 'next/cache';
import { getParishById, getParishes, getParishesTotals } from './parish-service';
import { CACHE_ENTITIES, CACHE_REVALIDATE, CACHE_TAGS } from '@/shared/constants/cache';
import { createCacheEntityTag, createCacheKey } from '@/shared/lib/cache-utils';
import { FetchParishById, FetchParishes, ResponseParishesDTO } from '../model/types';

export const getParishByIdCached = (params: FetchParishById) => {
  const cacheKey = createCacheKey(CACHE_ENTITIES.PARISH, params.id, params.locale!);
  const entityTag = createCacheEntityTag(CACHE_ENTITIES.PARISH, params.id);

  return unstable_cache(
    async () => getParishById(params),
    [cacheKey],
    {
      revalidate: CACHE_REVALIDATE.NORMAL,
      tags: [CACHE_TAGS.PARISHES, entityTag]
    }
  )();
};

export const getParishesCached = (params: FetchParishes): Promise<ResponseParishesDTO> => {
  const cacheKey = createCacheKey(
    CACHE_TAGS.PARISHES,
    params.page || 1,
    params.search || 'all',
    params.locale!
  );

  return unstable_cache(
    async () => getParishes(params),
    [cacheKey],
    {
      revalidate: CACHE_REVALIDATE.NORMAL,
      tags: [CACHE_TAGS.PARISHES]
    }
  )();
};

export const getParishesTotalsCached = (params: FetchParishes) => {
  const cacheKey = createCacheKey(CACHE_TAGS.PARISHES_TOTALS, params.locale!);

  return unstable_cache(
    async () => getParishesTotals(params),
    [cacheKey],
    {
      revalidate: CACHE_REVALIDATE.NORMAL,
      tags: [CACHE_TAGS.PARISHES, CACHE_TAGS.PARISHES_TOTALS]
    }
  )();
};