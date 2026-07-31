import { unstable_cache } from 'next/cache';
import { getFilteredUsers } from './user-service';
import { createCacheKey } from '@/shared/lib/cache-utils';
import { CACHE_ENTITIES, CACHE_REVALIDATE } from '@/shared/constants/cache';
import { FetchUsers } from '../model/types';

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