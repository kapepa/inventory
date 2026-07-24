export const CACHE_REVALIDATE = {
  FAST: 60, // 1 m        
  NORMAL: 600, // 10 m
  SLOW: 1800, // 30 m
  STATIC: 3600, // 1 h
} as const;

export const CACHE_TAGS = {
  //parishes
  PARISHES: 'parishes',
  PARISHES_TOTALS: 'parishes-totals',

  //products
  PRODUCTS: 'products',
  PRODUCTS_WIDE: 'products-wide',
  PRODUCTS_SHORT: 'products-short',
  PRODUCTS_STATUS: 'products-status-counts',

  //categories
  CATEGORIES: 'categories',
  CATEGORIES_BY_PARISH_ID: 'categories-by-parish-id',
  CATEGORIES_PRODUCTS_COUNT: 'categories-products-count',

  // Session
  SESSION: 'session',
  SESSION_USER: 'session-user',
} as const;

export const CACHE_ENTITIES = {
  PARISH: 'parish',
  PRODUCT: 'product',
  CATEGORY: 'category',
  USER: 'user',
} as const;