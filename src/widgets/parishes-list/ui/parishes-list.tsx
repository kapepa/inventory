"use client"

import { useCallback, useEffect } from "react"
import { ParishWideCard, ParishWithRelations, useInfiniteParishes, ParishWideHeader, ParishWideCardSkeleton } from "@/entities"
import { cn, QUERY_PARAMS_KEYS, useIntersectionObserver, useQueryParam } from "@/shared"
import { useDeleteParish } from "@/features"
import { useTranslations } from "next-intl"

export const PARISH_GRID_LAYOUT = "grid grid-cols-[minmax(290px,_1fr)_80px_80px_170px_170px_70px] items-center gap-4";

interface ParishesListProps {
  className?: string,
  initialParishes?: ParishWithRelations[],
  initialHasMore?: boolean,
  initialTotal?: number,
}

export const ParishesList = ({
  className,
  initialParishes = [],
  initialHasMore = true,
  initialTotal = 0,
}: ParishesListProps) => {
  const t = useTranslations('parishe');
  const [search] = useQueryParam(QUERY_PARAMS_KEYS.PARISHES_SEARCH);
  const { parishes, isLoading, error, hasMore, loadMore } = useInfiniteParishes(search, initialParishes, initialHasMore, initialTotal)
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })
  const { confirmDelete } = useDeleteParish()

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  const handlerDeleteParish = useCallback((parish: ParishWithRelations) => {
    confirmDelete(parish);
  }, [confirmDelete])

  if (error) return <div className="text-destructive text-center py-4">{t("parishes-list.error")}</div>
  if (!parishes.length) return <div className="text-center py-4 text-destructive">{t("parishes-list.empty")}</div>

  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-x-auto py-4">
        <div className="min-w-250">

          <ParishWideHeader className={PARISH_GRID_LAYOUT} />

          <div className="flex flex-col gap-3">
            {parishes.map((parish) => (
              <ParishWideCard
                key={parish.id}
                parish={parish}
                onDeleteParish={handlerDeleteParish}
                className={PARISH_GRID_LAYOUT}
              />
            ))}
            {(hasMore || isLoading) && (
              <div ref={targetRef} className="flex flex-col gap-3 mt-3">
                {isLoading && <ParishWideCardSkeleton className={PARISH_GRID_LAYOUT} />}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
