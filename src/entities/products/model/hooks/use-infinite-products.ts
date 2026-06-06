"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ProductsWithRelations, fetchProducts } from "@/entities/products"
import { PAGINATION_PRODUCTS_DEFAULTS } from "@/shared"

interface UseInfiniteProducts {
  parishId: string | null,
  search?: string,
  initialProducts?: ProductsWithRelations[],
  initialHasMore?: boolean
}

export const useInfiniteProducts = ({
  parishId,
  search = "",
  initialProducts = [],
  initialHasMore = false,
}: UseInfiniteProducts) => {
  const [products, setProducts] = useState<ProductsWithRelations[]>(initialProducts)
  const [page, setPage] = useState(2)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isFirstRender = useRef(true)
  const isInitialized = useRef(false)

  // Avoid hydration flicker: use initialProducts if the store is still empty and we haven't initialized yet
  const effectiveProducts = (!isInitialized.current && products.length === 0) ? initialProducts : products
  const effectiveHasMore = (!isInitialized.current && products.length === 0) ? initialHasMore : hasMore

  // Sync initial data from server only once on mount
  useEffect(() => {
    if (!isInitialized.current && initialProducts.length > 0) {
      setProducts(initialProducts)
      setPage(2)
      setHasMore(initialHasMore)
      isInitialized.current = true
    }
  }, [initialProducts, initialHasMore])

  const fetchItems = useCallback(
    async (isFirstPage: boolean = false, signal?: AbortSignal) => {
      if (!parishId) {
        setProducts([])
        setHasMore(false)
        return
      }

      if (!isFirstPage && (isLoading || !hasMore)) return

      setIsLoading(true)
      setError(null)

      try {
        const currentPage = isFirstPage ? 1 : page
        const response = await fetchProducts({
          parishId,
          page: currentPage,
          limit: PAGINATION_PRODUCTS_DEFAULTS.LIMIT,
          search: search,
          signal,
        })

        if (isFirstPage) {
          setProducts(response.data)
          setPage(2)
        } else {
          setProducts(prev => [...prev, ...response.data])
          setPage(prev => prev + 1)
        }

        setHasMore(response.hasMore)
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return
        setError(err instanceof Error ? err.message : "Failed to load products")
      } finally {
        setIsLoading(false)
      }
    },
    [parishId, page, hasMore, search]
  )

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const controller = new AbortController()
    fetchItems(true, controller.signal)
    return () => controller.abort()
  }, [parishId, search, fetchItems])

  const loadMore = () => fetchItems(false);

  const clearProducts = useCallback(() => {
    setProducts([])
    setPage(2)
    setHasMore(false)
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
  }
}
