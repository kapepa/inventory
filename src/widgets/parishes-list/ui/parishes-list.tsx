"use client"

import { useCallback, useEffect } from "react"
import { ParishWideCard, ParishWithRelations, useInfiniteParishes, ParishWideHeader, ParishWideCardSkeleton } from "@/entities"
import { cn, QUERY_PARAMS_KEYS, useIntersectionObserver, useQueryParam } from "@/shared"
import { useDeleteParish } from "@/features"
import { useTranslations } from "next-intl"

export const PARISH_GRID_LAYOUT = cn(
  "items-center grid gap-4",
  "grid-rows-6 grid-cols-2 grid-rows-4",
  "md:grid-cols-[minmax(225px,_6fr)_minmax(45px,_1fr)_minmax(90px,_1fr)_minmax(110px,_2fr)_minmax(90px,_2fr)_minmax(50px,_1fr)] md:min-w-[725px] md:grid-rows-1",
);

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
  const { confirmDeleteParish } = useDeleteParish()

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  const handlerDeleteParish = useCallback((parish: ParishWithRelations) => {
    confirmDeleteParish(parish);
  }, [confirmDeleteParish])

  if (error) return <div className="text-destructive text-center py-4">{t("parishes-list.error")}</div>
  if (!parishes.length) return <div className="text-center py-4 text-destructive">{t("parishes-list.empty")}</div>

  return (
    <div className={cn("w-full", className)}>
      <div className="pb-4">

        <ParishWideHeader className={cn(PARISH_GRID_LAYOUT, "hidden md:grid")} />

        <div className="flex flex-col gap-3 mx-auto">
          {parishes.map((parish) => (
            <ParishWideCard
              key={parish.id}
              parish={parish}
              onDeleteParish={handlerDeleteParish}
              className={cn(PARISH_GRID_LAYOUT,)}
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
  )
}
