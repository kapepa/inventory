import { unstable_cache } from 'next/cache';
import { cookies } from 'next/headers';
import { getUserByIdInternal } from './auth-service';
import { COOKIE_KEYS } from '@/shared/constants';
import { CACHE_REVALIDATE, CACHE_TAGS } from '@/shared/constants/cache';
import { verifyToken } from '@/shared/lib/auth';

export const getSessionUserCached = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_KEYS.AUTH_TOKEN)?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  return unstable_cache(
    () => getUserByIdInternal(payload.userId),
    [CACHE_TAGS.SESSION_USER, payload.userId],
    {
      revalidate: CACHE_REVALIDATE.FAST,
      tags: [CACHE_TAGS.SESSION]
    }
  )();
};