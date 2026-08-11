"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { FetchUsersParams, ResponseUsersDTO, UserPublic } from "../types";
import { useUsersStore } from "../users-store";
import { PAGINATION_USERS_DEFAULTS } from "@/shared/constants/pagination";
import { useDebouncedCallback } from "@/shared/lib/hooks/use-debounced-callback";

interface UseInfiniteUsersProps {
  search?: string,
  initialUsers?: UserPublic[],
  initialHasMore?: boolean
  fetchFnAction: (params: FetchUsersParams) => Promise<ResponseUsersDTO>
}

export const useInfiniteUsers = ({
  search = "",
  initialUsers = [],
  initialHasMore = false,
  fetchFnAction,
}: UseInfiniteUsersProps) => {
  const { setTotal, setPage } = useUsersStore()
  const [users, setUsers] = useState<UserPublic[]>(initialUsers)
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
    if (!isInitialized.current && initialUsers.length > 0) {
      setPage(1)
      setTotal(initialUsers.length)
      isInitialized.current = true
      isCurrentPage.current = 2
    }
  }, [initialUsers.length, setPage, setTotal])


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
        const params: FetchUsersParams = {
          page,
          limit: PAGINATION_USERS_DEFAULTS.LIMIT,
          signal,
        }

        if (search) params.search = search
        const response = await fetchFnAction(params)

        if (isFirstPage) {
          setUsers(response.data)
          setPage(2)
          isCurrentPage.current = 2
        } else {
          setUsers(prev => [...prev, ...response.data])
          isCurrentPage.current = page + 1
          setPage(page + 1)
        }

        setTotal(response.total)
        setHasMore(response.hasMore)
        hasMoreRef.current = response.hasMore
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return
        setError(err instanceof Error ? err.message : "Failed to load users")
      } finally {
        setIsLoading(false)
        isLoadingRef.current = false
      }
    },
    [search, setUsers, setPage, setHasMore, fetchFnAction]
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

  const clearUsers = useCallback(() => {
    setUsers([])
    setPage(1)
    setError(null)
    setHasMore(true)
    setIsLoading(false)
    isCurrentPage.current = 1
    isLoadingRef.current = false
    hasMoreRef.current = true
  }, [])

  return {
    users: (!isInitialized.current && users.length === 0) ? initialUsers : users,
    hasMore: (!isInitialized.current && users.length === 0) ? initialHasMore : hasMore,
    isLoading,
    error,
    loadMore,
    clearUsers,
  }
}