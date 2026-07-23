export const createCacheEntityTag = (entity: string, id: string) => `${entity}-${id}` as const;
export const createCacheKey = (...parts: (string | number)[]) => parts.join('-');
export const createCacheLocalizedPath = (locale: string, path: string) => `/${locale}/${path}` as const;