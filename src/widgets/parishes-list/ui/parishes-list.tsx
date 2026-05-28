"use client"

import { cn } from "@/shared"
import { useCallback, useEffect } from "react"
import { ParishCard, ParishWithRelations } from "@/entities/parish"
import { useIntersectionObserver } from "@/shared/lib/hooks/use-intersection-observer"
import { useInfiniteParishes } from "../model/use-infinite-parishes"
import { ParishesListHeader } from "./parishes-list-header"
import { ParishCardSkeleton } from "./parish-card-skeleton"
import { useDeleteParish } from "@/features/delete-parish/model/use-delete-parish"

export const PARISH_GRID_LAYOUT = "grid grid-cols-[minmax(290px,_1fr)_80px_80px_170px_170px_70px] items-center gap-4";

interface ParishesListProps {
  className?: string
  initialParishes?: ParishWithRelations[]
  initialHasMore?: boolean
}

export const ParishesList = ({
  className,
  initialParishes = [],
  initialHasMore = true
}: ParishesListProps) => {
  const { parishes, isLoading, error, hasMore, loadMore, removeParish } = useInfiniteParishes("", initialParishes, initialHasMore)
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })
  const { confirmDelete } = useDeleteParish()

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading])

  if (error) return <div className="text-destructive text-center py-4">{error}</div>

  const handlerDeleteParish = useCallback((parish: ParishWithRelations) => {
    confirmDelete(parish, (id) => {
      removeParish(id);
    });
  }, [confirmDelete, removeParish])

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