"use client"

import { useCallback, useEffect, useMemo } from "react"
import { StateMessageDynamic } from "@/shared/ui-dynamic/state-message-dynamic"
import { useTranslations } from "next-intl"
import { fetchParishesTotals } from "@/entities/parish/api/parish-api"
import { cn } from "@/shared/lib/utils";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys"
import { useQueryParam } from "@/shared/lib/hooks/use-query-param"
import { useIntersectionObserver } from "@/shared/lib/hooks"
import { isTotalsParish, ParishWithRelationsTotals } from "@/entities/parish/model/types"
import { useParishesStore } from "@/entities/parish/model/parish-store"
import { useInfiniteParishes } from "@/entities/parish/model/hooks/use-infinite-parishes"
import { ParishWideHeader, ParishWideHeaderSkeleton } from "@/entities/parish/ui/parish-wide/parish-wide-header"
import { getParishLayout } from "./parish-list.styles"
import { useDeleteParishContext } from "@/shared/lib/providers/delete-parish-context"
import { ParishWideCard, ParishWideCardSkeleton } from "@/entities/parish/ui/parish-wide/parish-wide-card"
import { ScrollArea } from "@/shared/ui/scroll-area"

interface ParishesListProps {
  isAdmin: boolean,
  className?: string,
  initialParishes?: ParishWithRelationsTotals[],
  initialHasMore?: boolean,
}

export const ParishesList = ({
  isAdmin,
  className,
  initialParishes = [],
  initialHasMore = true,
}: ParishesListProps) => {
  const t = useTranslations('parishes-list');
  const [search] = useQueryParam(QUERY_PARAMS_KEYS.PARISHES_SEARCH);
  const newParishe = useParishesStore((state) => state.newParishe)
  const addNewParish = useParishesStore((state) => state.addNewParish)
  const { parishes, isLoading, error, hasMore, loadMore, addParishes, removeParishes } = useInfiniteParishes<ParishWithRelationsTotals>({
    search, initialParishes, initialHasMore, fetchFnAction: fetchParishesTotals
  })
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })
  const { confirmDelete } = useDeleteParishContext();

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
    confirmDelete(parish, () => removeParishes(parish.id));
  }, [removeParishes])


  if (error && !isLoading) return (
    <StateMessageDynamic variant="destructive">
      {t("errors.infinite-scroll-error")}
    </StateMessageDynamic>
  )

  if (!hasMore && !parishes.length) return (
    <StateMessageDynamic >
      {t("parishes-empty")}
    </StateMessageDynamic>
  )

  const PARISH_LAYOUT = useMemo(() => getParishLayout(isAdmin), [isAdmin])

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

export const ParishesListSkeleton = ({ className }: { className?: string }) => {
  const isAdmin = false
  const PARISH_LAYOUT = useMemo(() => getParishLayout(isAdmin), [isAdmin])

  return (
    <div className={cn("w-full min-h-0 flex flex-col", className)}>
      <ParishWideHeaderSkeleton
        isAdmin={isAdmin}
        className={cn(PARISH_LAYOUT, "hidden md:grid shrink-0")}
      />
      <div className="flex-1 min-h-0 w-full mx-auto max-w-lg lg:max-w-full overflow-hidden">
        <div className="flex flex-col gap-3 mx-auto pb-6 md:pb-16 w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <ParishWideCardSkeleton
              key={`parishes-list-skeleton-${index}`}
              isAdmin={isAdmin}
              className={PARISH_LAYOUT}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

ParishesListSkeleton.displayName = "ParishesListSkeleton"