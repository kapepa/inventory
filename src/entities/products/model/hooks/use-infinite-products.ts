"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { FetchProductsParams, useProductsStore } from "@/entities/products"
import { PAGINATION_PRODUCTS_DEFAULTS } from "@/shared"

interface FetchResponse<T> {
  data: T[];
  hasMore: boolean;
}

interface UseInfiniteProductsProps<T> {
  parishId: string | null,
  categoryId?: string,
  specification?: string,
  initialProducts?: T[],
  initialHasMore?: boolean
  fetchFnAction: (params: FetchProductsParams) => Promise<FetchResponse<T>>
}

export const useInfiniteProducts = <T extends { id: string }>({
  parishId,
  categoryId = "",
  specification = "",
  initialProducts = [],
  initialHasMore = false,
  fetchFnAction,
}: UseInfiniteProductsProps<T>) => {
  const { page, hasMore, setTotal, setPage, setHasMore, setFull } = useProductsStore()
  const [products, setProducts] = useState<T[]>(initialProducts)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isFirstRender = useRef(true)
  const isInitialized = useRef(false)

  // Avoid hydration flicker: use initialProducts if the store is still empty and we haven't initialized yet
  const effectiveProducts = (!isInitialized.current && products.length === 0) ? initialProducts : products
  const effectiveHasMore = (!isInitialized.current && products.length === 0) ? initialHasMore : hasMore

  useEffect(() => {
    setTotal(products.length)
  }, [products.length, setTotal])

  // Sync initial data from server only once on mount
  useEffect(() => {
    if (!isInitialized.current && initialProducts.length > 0) {
      setProducts(initialProducts)
      setFull({
        total: initialProducts.length,
        page: 2,
        hasMore: initialHasMore,
      })
      isInitialized.current = true
    }
  }, [initialProducts, initialHasMore, setFull, setProducts])

  const addProduct = useCallback((newProduct: T) => {
    setProducts((prev) => [newProduct, ...prev]);
  }, []);

  const removeProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }, []);

  const fetchItems = useCallback(
    async (isFirstPage: boolean = false, signal?: AbortSignal) => {
      if (!parishId) {
        setProducts([])
        setHasMore(false)
        return
      }

      if (!isFirstPage && (isLoading || hasMore)) return

      setIsLoading(true)
      setError(null)

      try {
        const currentPage = isFirstPage ? 1 : page
        const response = await fetchFnAction({
          parishId,
          specification,
          page: currentPage,
          limit: PAGINATION_PRODUCTS_DEFAULTS.LIMIT,
          categoryId: categoryId,
          signal,
        })

        if (isFirstPage) {
          setProducts(response.data)
          setPage(2)
        } else {
          setProducts(prev => [...prev, ...response.data])
          setPage(page + 1)
        }

        setHasMore(response.hasMore)
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return
        setError(err instanceof Error ? err.message : "Failed to load products")
      } finally {
        setIsLoading(false)
      }
    },
    [parishId, page, hasMore, categoryId, specification, setPage, setHasMore, fetchFnAction]
  )

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const controller = new AbortController()
    fetchItems(true, controller.signal)
    return () => controller.abort()
  }, [parishId, categoryId, specification, fetchItems])

  const loadMore = () => fetchItems(false);

  const clearProducts = useCallback(() => {
    setProducts([])
    setFull({ total: 0, page: 1, hasMore: false })
    setError(null)
    isInitialized.current = false
  }, [])

  return {
    products: effectiveProducts,
    isLoading,
    error,
    hasMore: effectiveHasMore,
    loadMore,
    clearProducts,
    addProduct,
    removeProduct,
  }
}
