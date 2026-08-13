"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useDebouncedCallback } from "@/shared/lib/hooks/use-debounced-callback"
import { useParishesStore } from "../parish-store"
import { PAGINATION_PARISHES_DEFAULTS } from "@/shared/constants/pagination"
import { FetchParishesParams } from "../types"

interface FetchResponse<T> {
  data: T[];
  hasMore: boolean;
  total: number,
}

interface UseInfiniteParishesProps<T> {
  search: string,
  initialParishes: T[],
  initialHasMore: boolean,
  fetchFnAction: (params: FetchParishesParams) => Promise<FetchResponse<T>>
}

export const useInfiniteParishes = <T extends { id: string }>({
  search = "",
  initialParishes = [],
  initialHasMore = false,
  fetchFnAction,
}: UseInfiniteParishesProps<T>) => {
  const setTotal = useParishesStore((state) => state.setTotal)
  const setPage = useParishesStore((state) => state.setPage)
  const [parishes, setParishes] = useState<T[]>(initialParishes)
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
    if (!isInitialized.current && initialParishes.length > 0) {
      setPage(1)
      setTotal(initialParishes.length)
      isInitialized.current = true
      isCurrentPage.current = 2
    }
  }, [initialParishes.length, setPage, setTotal])

  const addParishes = useCallback((parishe: T) => {
    setParishes((prev) => [parishe, ...prev]);
    queueMicrotask(() => {
      const currentTotal = useParishesStore.getState().total;
      useParishesStore.getState().setTotal(currentTotal + 1);
    });
  }, []);

  const removeParishes = useCallback((id: string) => {
    setParishes((prev) => {
      const next = prev.filter((parishe) => parishe.id !== id);
      queueMicrotask(() => { useParishesStore.getState().setTotal(next.length) })
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
        const params: FetchParishesParams = {
          page,
          limit: PAGINATION_PARISHES_DEFAULTS.LIMIT,
          signal,
        }

        if (search) params.search = search
        const response = await fetchFnAction(params)

        if (isFirstPage) {
          setParishes(response.data)
          setPage(2)
          isCurrentPage.current = 2
        } else {
          setParishes(prev => [...prev, ...response.data])
          isCurrentPage.current = page + 1
          setPage(page + 1)
        }

        setTotal(response.total)
        setHasMore(response.hasMore)
        hasMoreRef.current = response.hasMore
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return
        setError(err instanceof Error ? err.message : "Failed to load parishes")
      } finally {
        setIsLoading(false)
        isLoadingRef.current = false
      }
    },
    [search, setParishes, setPage, setHasMore, setTotal, fetchFnAction]
    //The dependencies are already provided with debounced versions from, there is a delay from the input
  )

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    // Don't fetch if we already have initial data on first render
    // if (isInitialized.current && isCurrentPage.current >= 2) return

    const controller = new AbortController()
    fetchItems(true, controller.signal)
    return () => controller.abort()
  }, [fetchItems])

  const loadMore = useDebouncedCallback(() => { fetchItems(false) }, 1200)

  const clearParishes = useCallback(() => {
    setParishes([])
    setPage(1)
    setError(null)
    setHasMore(true)
    setIsLoading(false)
    isCurrentPage.current = 1
    isLoadingRef.current = false
    hasMoreRef.current = true
  }, [])

  return {
    parishes: (!isInitialized.current && parishes.length === 0) ? initialParishes : parishes,
    hasMore: (!isInitialized.current && parishes.length === 0) ? initialHasMore : hasMore,
    isLoading,
    error,
    loadMore,
    addParishes,
    removeParishes,
    clearParishes
  }
}
