"use client"

import { useCallback, useEffect } from "react"
import { ParishWideCard, ParishWithRelationsTotals, useInfiniteParishes, ParishWideHeader, ParishWideCardSkeleton, useParishesStore, ParishWithRelations, isTotalsParish } from "@/entities"
import { cn, QUERY_PARAMS_KEYS, useIntersectionObserver, useQueryParam } from "@/shared"
import { useDeleteParish } from "@/features"
import { useTranslations } from "next-intl"
import { fetchParishesTotals } from "@/entities/parish/api/parish-api"

export const PARISH_GRID_LAYOUT = cn(
  "items-center grid gap-4",
  "grid-rows-6 grid-cols-2 grid-rows-4",
  "md:grid-cols-[minmax(225px,_6fr)_minmax(45px,_1fr)_minmax(90px,_1fr)_minmax(110px,_2fr)_minmax(90px,_2fr)_minmax(50px,_1fr)] md:min-w-[725px] md:grid-rows-1",
);

interface ParishesListProps {
  className?: string,
  initialParishes?: ParishWithRelationsTotals[],
  initialHasMore?: boolean,
}

export const ParishesList = ({
  className,
  initialParishes = [],
  initialHasMore = true,
}: ParishesListProps) => {
  const t = useTranslations('parishe');
  const [search] = useQueryParam(QUERY_PARAMS_KEYS.PARISHES_SEARCH);
  const { newParishe, addNewParish } = useParishesStore()
  const { parishes, isLoading, error, hasMore, loadMore, addParishes, removeParishes } = useInfiniteParishes<ParishWithRelationsTotals>({
    search, initialParishes, initialHasMore, fetchFnAction: fetchParishesTotals
  })
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })
  const { confirmDeleteParish } = useDeleteParish()

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  useEffect(() => {
    if (newParishe && isTotalsParish(newParishe)) {
      addParishes(newParishe)
      addNewParish(null)
    }
  }, [newParishe, addParishes, addNewParish])

  const handlerDeleteParish = useCallback((parish: ParishWithRelationsTotals) => {
    confirmDeleteParish(parish, () => removeParishes(parish.id));
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
            <div ref={targetRef} className="flex flex-col gap-3">
              {isLoading && <ParishWideCardSkeleton className={PARISH_GRID_LAYOUT} />}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
