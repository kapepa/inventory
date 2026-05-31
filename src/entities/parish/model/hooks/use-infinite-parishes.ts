"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ParishWithRelations, fetchParishes } from "@/entities/parish"
import { PAGINATION_PARISHES_DEFAULTS } from "@/shared"

export const useInfiniteParishes = (
  search: string = "",
  initialParishes: ParishWithRelations[] = [],
  initialHasMore: boolean = true
) => {
  const [parishes, setParishes] = useState<ParishWithRelations[]>(initialParishes)
  const [page, setPage] = useState(initialParishes.length > 0 ? 2 : 1)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isFirstRender = useRef(true)

  const fetchItems = useCallback(
    async (isFirstPage: boolean = false, signal?: AbortSignal) => {
      if (!isFirstPage && (isLoading || !hasMore)) return

      setIsLoading(true)
      setError(null)

      try {
        const currentPage = isFirstPage ? 1 : page
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
          setParishes((prev) => [...prev, ...response.data])
          setPage((prev) => prev + 1)
        }

        setHasMore(response.hasMore)
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return
        setError(err instanceof Error ? err.message : "Failed to load parishes")
      } finally {
        setIsLoading(false)
      }
    },
    [isLoading, hasMore, page, search]
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

  const removeParish = useCallback((id: string) => {
    setParishes(prev => prev.filter(p => p.id !== id));
  }, [])

  return { parishes, isLoading, error, hasMore, loadMore, removeParish }
}
