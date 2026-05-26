"use client"

import { useState, useEffect, useCallback } from "react"
import { Parish, fetchParishes } from "@/entities/parish"
import { useDebounce } from "@/shared/lib/hooks/use-debounce"

const LIMIT = 20

export const useInfiniteParishes = (
  search: string = "",
  initialParishes: Parish[] = [],
  initialHasMore: boolean = true
) => {
  const [parishes, setParishes] = useState<Parish[]>(initialParishes)
  const [page, setPage] = useState(initialParishes.length > 0 ? 2 : 1)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedSearch = useDebounce(search, 500)

  const fetchItems = useCallback(
    async (isFirstPage: boolean = false, signal?: AbortSignal) => {
      if (!isFirstPage && (isLoading || !hasMore)) return

      setIsLoading(true)
      setError(null)

      try {
        const currentPage = isFirstPage ? 1 : page
        const response = await fetchParishes({
          page: currentPage,
          limit: LIMIT,
          search: debouncedSearch,
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
    [isLoading, hasMore, page, debouncedSearch]
  )

  useEffect(() => {
    if (initialParishes.length > 0) return

    const controller = new AbortController()
    fetchItems(true, controller.signal)
    return () => controller.abort()
  }, [debouncedSearch])

  const loadMore = () => fetchItems(false)

  return { parishes, isLoading, error, hasMore, loadMore }
}
