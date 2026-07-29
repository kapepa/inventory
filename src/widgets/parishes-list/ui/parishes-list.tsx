"use client"

import { useCallback, useEffect } from "react"
import { ParishWideCard, ParishWithRelationsTotals, useInfiniteParishes, ParishWideHeader, ParishWideCardSkeleton, useParishesStore, isTotalsParish, ParishWideHeaderSkeleton } from "@/entities"
import { cn, QUERY_PARAMS_KEYS, ScrollArea, StateMessage, useIntersectionObserver, useQueryParam } from "@/shared"
import { useDeleteParish, useHydratedIsAdmin } from "@/features"
import { useTranslations } from "next-intl"
import { fetchParishesTotals } from "@/entities/parish/api/parish-api"

const PARISH_GRID_BASE = "items-center grid gap-4 grid-rows-6 grid-cols-2 pb-4 md:min-w-[725px] md:grid-rows-1"

const PARISH_GRID_LAYOUT = cn(
  PARISH_GRID_BASE,
  "md:grid-cols-[6fr_1fr_1fr_2fr_2fr] grid-rows-3"
);

const PARISH_GRID_LAYOUT_ADMIN = cn(
  PARISH_GRID_BASE,
  "md:grid-cols-[6fr_1fr_1fr_2fr_2fr_1fr] grid-rows-4",
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
  const t = useTranslations('parishes-list');
  const isAdmin = useHydratedIsAdmin();
  const [search] = useQueryParam(QUERY_PARAMS_KEYS.PARISHES_SEARCH);
  const newParishe = useParishesStore((state) => state.newParishe)
  const addNewParish = useParishesStore((state) => state.addNewParish)
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

  if (error && !isLoading) return (
    <StateMessage variant="destructive">
      {t("errors.infinite-scroll-error")}
    </StateMessage>
  )

  if (!hasMore && !parishes.length) return (
    <StateMessage>
      {t("parishes-empty")}
    </StateMessage>
  )

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

ParishesList.displayName = "ParishesList"

export const ParishesListSkeleton = ({ className }: ParishesListProps) => {
  const isAdmin = false
  const PARISH_LAYOUT = PARISH_GRID_LAYOUT

  return (
    <div className={cn("w-full min-h-0 flex flex-col", className)}>
      <ParishWideHeaderSkeleton
        isAdmin={isAdmin}
        className={cn(PARISH_LAYOUT, "hidden md:grid shrink-0")}
      />
      <ScrollArea className="flex-1 min-h-0 w-full mx-auto max-w-lg lg:max-w-full">
        <div className="flex flex-col gap-3 mx-auto pb-6 md:pb-16 w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <ParishWideCardSkeleton
              key={`parishes-list-skeleton-${index}`}
              isAdmin={isAdmin}
              className={PARISH_LAYOUT}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

ParishesListSkeleton.displayName = "ParishesListSkeleton"