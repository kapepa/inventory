"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { FetchProductsParams, useProductsStore } from "@/entities/products"
import { PAGINATION_PRODUCTS_DEFAULTS, useDebouncedCallback } from "@/shared"

interface FetchResponse<T> {
  data: T[];
  total: number
  hasMore: boolean;
}

interface UseInfiniteProductsProps<T> {
  search?: string,
  parishId: string | null,
  categoryId?: string,
  specification?: string,
  initialProducts?: T[],
  initialHasMore?: boolean
  fetchFnAction: (params: FetchProductsParams) => Promise<FetchResponse<T>>
}

export const useInfiniteProducts = <T extends { id: string }>({
  search = "",
  parishId,
  categoryId = "",
  specification = "",
  initialProducts = [],
  initialHasMore = false,
  fetchFnAction,
}: UseInfiniteProductsProps<T>) => {
  const { setTotal, setPage } = useProductsStore()
  const [products, setProducts] = useState<T[]>(initialProducts)
  const [hasMore, setHasMore] = useState<boolean>(initialHasMore)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isFirstRender = useRef(true)
  const isInitialized = useRef(false)
  const isLoadingRef = useRef(false)
  const isCurrentPage = useRef(1)
  const hasMoreRef = useRef(initialHasMore)

  // Sync initial data from server only once on mount
  useEffect(() => {
    if (!isInitialized.current && initialProducts.length > 0) {
      setPage(1)
      setTotal(initialProducts.length)
      isInitialized.current = true
      isCurrentPage.current = 2
    }
  }, [initialProducts.length, setPage, setTotal])

  const addProduct = useCallback((newProduct: T) => {
    setProducts((prev) => [newProduct, ...prev]);
    queueMicrotask(() => {
      const currentTotal = useProductsStore.getState().total;
      useProductsStore.getState().setTotal(currentTotal + 1);
    });
  }, []);

  const removeProduct = useCallback((id: string) => {
    setProducts((prev) => {
      const next = prev.filter((parishe) => parishe.id !== id);
      queueMicrotask(() => useProductsStore.getState().setTotal(next.length))
      return next;
    });
  }, []);

  const fetchItems = useCallback(
    async (isFirstPage: boolean = false, signal?: AbortSignal) => {
      if (!isFirstPage && (isLoadingRef.current || !hasMoreRef.current)) return

      if (isFirstPage) {
        isCurrentPage.current = 1
        hasMoreRef.current = true
      }

      isLoadingRef.current = true
      setIsLoading(true)
      setError(null)

      try {
        const page = isCurrentPage.current
        const params: FetchProductsParams = {
          page,
          limit: PAGINATION_PRODUCTS_DEFAULTS.LIMIT,
          signal,
        }

        if (search) params.search = search
        if (parishId) params.parishId = parishId
        if (categoryId) params.categoryId = categoryId
        if (specification) params.specification = specification
        const response = await fetchFnAction(params)

        if (isFirstPage) {
          setProducts(response.data)
          setPage(2)
          isCurrentPage.current = 2
        } else {
          setProducts(prev => [...prev, ...response.data])
          isCurrentPage.current = page + 1
          setPage(page + 1)
        }

        setTotal(response.total)
        setHasMore(response.hasMore)
        hasMoreRef.current = response.hasMore
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return
        setError(err instanceof Error ? err.message : "Failed to load products")
      } finally {
        setIsLoading(false)
        isLoadingRef.current = false
      }
    },
    [search, parishId, categoryId, specification, setProducts, setPage, setHasMore, fetchFnAction]
    //The dependencies are already provided with debounced versions from, there is a delay from the input
  )

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const controller = new AbortController()
    fetchItems(true, controller.signal)
    return () => controller.abort()
  }, [fetchItems])

  const loadMore = useDebouncedCallback(() => { fetchItems(false) }, 1000)

  const clearProducts = useCallback(() => {
    setProducts([])
    setPage(1)
    setError(null)
    setHasMore(true)
    setIsLoading(false)
    isCurrentPage.current = 1
    isLoadingRef.current = false
    hasMoreRef.current = true
  }, [])

  return {
    products: (!isInitialized.current && products.length === 0) ? initialProducts : products,
    hasMore: (!isInitialized.current && products.length === 0) ? initialHasMore : hasMore,
    isLoading,
    error,
    loadMore,
    clearProducts,
    addProduct,
    removeProduct,
  }
}