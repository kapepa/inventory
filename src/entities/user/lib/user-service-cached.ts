import { unstable_cache } from 'next/cache';
import { getFilteredUsers } from './user-service';
import { FetchUsers } from '../model';
import { CACHE_ENTITIES, CACHE_REVALIDATE, createCacheKey } from '@/shared/server';

export const getFilteredUsersCached = (params: FetchUsers) => {
  const cacheKey = createCacheKey(
    CACHE_ENTITIES.USER,
    params.page || 1,
    params.search || 'all'
  );

  return unstable_cache(
    async () => getFilteredUsers(params),
    [cacheKey],
    {
      revalidate: CACHE_REVALIDATE.NORMAL,
      tags: [CACHE_ENTITIES.USER]
    }
  )();
};