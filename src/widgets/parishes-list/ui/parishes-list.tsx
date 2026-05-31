"use client"

import { useCallback, useEffect } from "react"
import { ParishCard, ParishWithRelations, useInfiniteParishes } from "@/entities"
import { cn, useIntersectionObserver, useQueryParam } from "@/shared"
import { ParishesListHeader } from "./parishes-list-header"
import { ParishCardSkeleton } from "./parish-card-skeleton"
import { useDeleteParish } from "@/features"

export const PARISH_GRID_LAYOUT = "grid grid-cols-[minmax(290px,_1fr)_80px_80px_170px_170px_70px] items-center gap-4";

interface ParishesListProps {
  className?: string,
  initialParishes?: ParishWithRelations[],
  initialHasMore?: boolean,
}

export const ParishesList = ({
  className,
  initialParishes = [],
  initialHasMore = true,
}: ParishesListProps) => {
  const [search] = useQueryParam('parishes-search');
  const { parishes, isLoading, error, hasMore, loadMore, removeParish } = useInfiniteParishes(search, initialParishes, initialHasMore)
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })
  const { confirmDelete } = useDeleteParish()

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading])

  const handlerDeleteParish = useCallback((parish: ParishWithRelations) => {
    confirmDelete(parish, (id) => {
      removeParish(id);
    });
  }, [confirmDelete, removeParish])

  if (error) return <div className="text-destructive text-center py-4">{error}</div>

  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-x-auto py-4">
        <div className="min-w-250">

          <ParishesListHeader className={PARISH_GRID_LAYOUT} />

          <div className="flex flex-col gap-3">
            {parishes.map((parish) => (
              <ParishCard
                key={parish.id}
                parish={parish}
                onDeleteParish={handlerDeleteParish}
                className={PARISH_GRID_LAYOUT}
              />
            ))}
          </div>

          {hasMore && (
            <div ref={targetRef} className="flex flex-col gap-3 mt-3">
              {isLoading && Array.from({ length: 3 }).map((_, i) => (
                <ParishCardSkeleton key={i} className={PARISH_GRID_LAYOUT} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}