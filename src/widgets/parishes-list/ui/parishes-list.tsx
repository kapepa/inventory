"use client"

import { useCallback, useEffect } from "react"
import { ParishWideCard, ParishWithRelationsTotals, useInfiniteParishes, ParishWideHeader, ParishWideCardSkeleton, useParishesStore, isTotalsParish } from "@/entities"
import { cn, QUERY_PARAMS_KEYS, ScrollArea, useIntersectionObserver, useQueryParam } from "@/shared"
import { useDeleteParish, useHydratedIsAdmin } from "@/features"
import { useTranslations } from "next-intl"
import { fetchParishesTotals } from "@/entities/parish/api/parish-api"

const PARISH_GRID_BASE = "items-center grid gap-4 grid-rows-6 grid-cols-2 pb-4"

const PARISH_GRID_LAYOUT = cn(
  PARISH_GRID_BASE,
  "md:grid-cols-[minmax(225px,_6fr)_minmax(45px,_1fr)_minmax(90px,_1fr)_minmax(110px,_2fr)_minmax(90px,_2fr)] md:min-w-[725px] md:grid-rows-1 grid-rows-3",
);

const PARISH_GRID_LAYOUT_ADMIN = cn(
  PARISH_GRID_BASE,
  "md:grid-cols-[minmax(225px,_6fr)_minmax(45px,_1fr)_minmax(90px,_1fr)_minmax(110px,_2fr)_minmax(90px,_2fr)_minmax(50px,_1fr)] md:min-w-[725px] md:grid-rows-1 grid-rows-4",
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
  const t = useTranslations('parish');
  const isAdmin = useHydratedIsAdmin();
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

  const PARISH_LAYOUT = isAdmin ? PARISH_GRID_LAYOUT_ADMIN : PARISH_GRID_LAYOUT

  return (
    <div className={cn("w-full min-h-0 flex flex-col", className)}>
      <ParishWideHeader
        isAdmin={isAdmin}
        className={cn(PARISH_LAYOUT, "hidden md:grid shrink-0")}
      />

      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col gap-3 mx-auto pb-6 md:pb-16">
          {parishes.map((parish) => (
            <ParishWideCard
              key={parish.id}
              parish={parish}
              isAdmin={isAdmin}
              onDeleteParish={handlerDeleteParish}
              className={PARISH_LAYOUT}
            />
          ))}
          {(hasMore || isLoading) && (
            <div ref={targetRef} className="flex flex-col gap-3">
              {isLoading && <ParishWideCardSkeleton isAdmin={isAdmin} className={PARISH_LAYOUT} />}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
