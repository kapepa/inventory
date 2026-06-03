"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ParishWithRelations, fetchParishes } from "@/entities/parish"
import { PAGINATION_PARISHES_DEFAULTS } from "@/shared"
import { useParishesStore } from "../parish-store"

export const useInfiniteParishes = (
  search: string = "",
  initialParishes: ParishWithRelations[] = [],
  initialHasMore: boolean = true
) => {
  const {
    parishes,
    setParishes,
    appendParishes,
    setPage,
    hasMore,
    setHasMore
  } = useParishesStore()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isFirstRender = useRef(true)
  const isInitialized = useRef(false)
  const loadingRef = useRef(false)

  // Avoid hydration flicker: use initialParishes if the store is still empty and we haven't initialized yet
  const effectiveParishes = (!isInitialized.current && parishes.length === 0) ? initialParishes : parishes
  const effectiveHasMore = (!isInitialized.current && parishes.length === 0) ? initialHasMore : hasMore

  // Sync initial data from server only once on mount
  useEffect(() => {
    if (!isInitialized.current) {
      if (initialParishes.length > 0 && parishes.length === 0) {
        setParishes(initialParishes)
        setPage(2)
        setHasMore(initialHasMore)
      }
      isInitialized.current = true
    }
  }, [initialParishes, initialHasMore, setParishes, setPage, setHasMore, parishes.length])

  const fetchItems = useCallback(
    async (isFirstPage: boolean = false, signal?: AbortSignal) => {
      // Use latest state from store to avoid stale closures
      const currentState = useParishesStore.getState()

      if (!isFirstPage && (loadingRef.current || !currentState.hasMore)) return

      loadingRef.current = true
      setIsLoading(true)
      setError(null)

      try {
        const currentPage = isFirstPage ? 1 : currentState.page
        const response = await fetchParishes({
          page: currentPage,
          limit: PAGINATION_PARISHES_DEFAULTS.LIMIT,
          search: search,
          signal,
        })

        if (isFirstPage) {
          setParishes(response.data)
          setPage(2)
        } else {
          appendParishes(response.data)
          setPage(currentState.page + 1)
        }

        setHasMore(response.hasMore)
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return
        setError(err instanceof Error ? err.message : "Failed to load parishes")
      } finally {
        loadingRef.current = false
        setIsLoading(false)
      }
    },
    [search, setParishes, appendParishes, setPage, setHasMore]
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
