"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useCategoriesStore } from "../categories-store";
import { RequestCategoriesProductsCountParams } from "../types";
import { PAGINATION_PRODUCTS_DEFAULTS } from "@/shared/constants/pagination";
import { useDebouncedCallback } from "@/shared/lib/hooks";

interface FetchResponse<T> {
  data: T[];
  total: number
  hasMore: boolean;
}

interface UseInfiniteCategoriesProps<T> {
  search?: string,
  initialCategories?: T[],
  initialHasMore?: boolean
  fetchFnAction: (params: RequestCategoriesProductsCountParams) => Promise<FetchResponse<T>>
}

export const useInfiniteCategories = <T extends { id: string }>({
  search = "",
  initialCategories = [],
  initialHasMore = false,
  fetchFnAction,
}: UseInfiniteCategoriesProps<T>) => {
  const { setTotal, setPage } = useCategoriesStore()
  const [categories, setCategories] = useState<T[]>(initialCategories)
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
    if (!isInitialized.current && initialCategories.length > 0) {
      setPage(1)
      setTotal(initialCategories.length)
      isInitialized.current = true
      isCurrentPage.current = 2
    }
  }, [initialCategories.length, setPage, setTotal])

  const addCategory = useCallback((newCategory: T) => {
    setCategories((prev) => [newCategory, ...prev]);
    queueMicrotask(() => {
      const currentTotal = useCategoriesStore.getState().total;
      useCategoriesStore.getState().setTotal(currentTotal + 1);
    });
  }, []);

  const removeCategory = useCallback((id: string) => {
    setCategories((prev) => {
      const next = prev.filter((category) => category.id !== id);
      queueMicrotask(() => useCategoriesStore.getState().setTotal(next.length))
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
        const params: RequestCategoriesProductsCountParams = {
          page,
          limit: PAGINATION_PRODUCTS_DEFAULTS.LIMIT,
          signal,
        }

        if (search) params.search = search
        const response = await fetchFnAction(params)

        if (isFirstPage) {
          setCategories(response.data)
          setPage(2)
          isCurrentPage.current = 2
        } else {
          setCategories(prev => [...prev, ...response.data])
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
    [search, setCategories, setPage, setHasMore, setTotal, fetchFnAction]
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

  const clearCategories = useCallback(() => {
    setCategories([])
    setPage(1)
    setError(null)
    setHasMore(true)
    setIsLoading(false)
    isCurrentPage.current = 1
    isLoadingRef.current = false
    hasMoreRef.current = true
  }, [])

  return {
    categories: (!isInitialized.current && categories.length === 0) ? initialCategories : categories,
    hasMore: (!isInitialized.current && categories.length === 0) ? initialHasMore : hasMore,
    isLoading,
    error,
    loadMore,
    clearCategories,
    addCategory,
    removeCategory,
  }
}