import { unstable_cache } from "next/cache"
import { getFilteredProductsShort, getFilteredProductsWide, getProductById, getProductStatusCounts } from "./product-service"
import { createCacheEntityTag, createCacheKey } from "@/shared/lib/cache-utils"
import { CACHE_ENTITIES, CACHE_REVALIDATE, CACHE_TAGS } from "@/shared/constants/cache"
import { FetchProducts, FetchProductsById } from "../model/types"

export const getFilteredProductsWideCached = (params: FetchProducts) => {
  const cacheKey = createCacheKey(
    CACHE_TAGS.PRODUCTS_WIDE,
    params.parishId || 'all',
    params.categoryId || 'all',
    params.specification || 'all',
    params.page || 1,
    params.search || "all",
    params.locale!
  )

  return unstable_cache(
    async () => getFilteredProductsWide(params),
    [cacheKey],
    {
      revalidate: CACHE_REVALIDATE.NORMAL,
      tags: [
        CACHE_TAGS.PRODUCTS,
        CACHE_TAGS.PRODUCTS_WIDE,
        params.parishId ? createCacheEntityTag(CACHE_ENTITIES.PARISH, params.parishId) : '',
        params.categoryId ? createCacheEntityTag(CACHE_ENTITIES.CATEGORY, params.categoryId) : '',
      ].filter(Boolean)
    }
  )()
}

export const getFilteredProductsShortCached = (params: FetchProducts) => {
  const cacheKey = createCacheKey(
    CACHE_TAGS.PRODUCTS_SHORT,
    params.parishId || 'all',
    params.page || 1,
    params.search || "all",
    params.locale!
  )

  return unstable_cache(
    async () => getFilteredProductsShort(params),
    [cacheKey],
    {
      revalidate: CACHE_REVALIDATE.NORMAL,
      tags: [
        CACHE_TAGS.PRODUCTS,
        CACHE_TAGS.PRODUCTS_SHORT,
        params.parishId ? createCacheEntityTag(CACHE_ENTITIES.PARISH, params.parishId) : '',
      ].filter(Boolean)
    }
  )()
}

export const getProductByIdCached = (params: FetchProductsById) => {
  const cacheKey = createCacheKey(
    CACHE_ENTITIES.PRODUCT,
    params.id,
    params.locale || 'default'
  )

  return unstable_cache(
    async () => getProductById(params),
    [cacheKey],
    {
      revalidate: CACHE_REVALIDATE.NORMAL,
      tags: [
        CACHE_TAGS.PRODUCTS,
        createCacheEntityTag(CACHE_ENTITIES.PRODUCT, params.id),
      ]
    }
  )()
}

export const getProductStatusCountsCached = unstable_cache(
  async () => getProductStatusCounts(),
  [CACHE_TAGS.PRODUCTS_STATUS],
  {
    revalidate: CACHE_REVALIDATE.SLOW,
    tags: [CACHE_TAGS.PRODUCTS, CACHE_TAGS.PRODUCTS_STATUS]
  }
)