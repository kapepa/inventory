"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { FetchParishesParams } from "@/entities/parish"
import { PAGINATION_PARISHES_DEFAULTS } from "@/shared"
import { useParishesStore } from "../parish-store"

interface FetchResponse<T> {
  data: T[];
  hasMore: boolean;
  total: number,
}

interface UseInfiniteParishesProps<T> {
  search: string,
  initialParishes: T[],
  initialHasMore: boolean,
  initialTotal?: number,
  fetchFnAction: (params: FetchParishesParams) => Promise<FetchResponse<T>>
}

export const useInfiniteParishes = <T extends { id: string }>({
  search = "",
  initialParishes = [],
  initialHasMore = false,
  initialTotal,
  fetchFnAction,
}: UseInfiniteParishesProps<T>) => {
  const { page, hasMore, setTotal, setPage, setHasMore, setFull } = useParishesStore()
  const [parishes, setParishes] = useState<T[]>(initialParishes)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isFirstRender = useRef(true)
  const isInitialized = useRef(false)

  // Avoid hydration flicker: use initialParishes if the store is still empty and we haven't initialized yet
  const effectiveParishes = (!isInitialized.current && parishes.length === 0) ? initialParishes : parishes
  const effectiveHasMore = (!isInitialized.current && parishes.length === 0) ? initialHasMore : hasMore

  useEffect(() => {
    setTotal(parishes.length)
  }, [parishes.length, setTotal])

  // Sync initial data from server only once on mount
  useEffect(() => {
    if (!isInitialized.current) {
      if (initialParishes.length > 0 && parishes.length === 0) {
        setParishes(initialParishes)
        setFull({
          total: initialParishes.length,
          page: 2,
          hasMore: initialHasMore,
        })
      }
      // We always set `total`, even if `initialParishes` is empty
      if (initialTotal !== undefined) setTotal(initialTotal)
      isInitialized.current = true
    }
  }, [initialParishes, initialHasMore, initialTotal, setFull, setParishes, setTotal, parishes.length])

  const fetchItems = useCallback(
    async (isFirstPage: boolean = false, signal?: AbortSignal) => {

      if (!isFirstPage && (isLoading || hasMore)) return
      setIsLoading(true)
      setError(null)

      try {
        const currentPage = isFirstPage ? 0 : page
        const response = await fetchFnAction({
          page: currentPage,
          limit: PAGINATION_PARISHES_DEFAULTS.LIMIT,
          search: search,
          signal,
        })

        if (isFirstPage) {
          setParishes(response.data)
          setPage(2)
          setTotal(response.total || response.data.length)
        } else {
          setParishes(prev => [...prev, ...response.data])
          setPage(page + 1)
        }

        setHasMore(response.hasMore)
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return
        setError(err instanceof Error ? err.message : "Failed to load parishes")
      } finally {
        setIsLoading(false)
      }
    },
    [search, setParishes, setPage, setHasMore, setTotal]
  )

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    const controller = new AbortController()
    fetchItems(true, controller.signal)
    return () => controller.abort()
  }, [search, fetchItems])

  const loadMore = () => fetchItems(false)

  return {
    parishes: effectiveParishes,
    isLoading,
    error,
    hasMore: effectiveHasMore,
    loadMore,
  }
}
