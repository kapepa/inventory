"use client"

import { memo, useCallback, useEffect, useMemo } from "react"
import { useTranslations } from "next-intl"
import { fetchParishesTotals } from "@/entities/parish/api/parish-api"
import { cn } from "@/shared/lib/utils";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys"
import { useQueryParam } from "@/shared/lib/hooks/use-query-param"
import { useIntersectionObserver } from "@/shared/lib/hooks/use-intersection-observer"
import { isTotalsParish, ParishWithRelationsTotals } from "@/entities/parish/model/types"
import { useParishesStore } from "@/entities/parish/model/parish-store"
import { useInfiniteParishes } from "@/entities/parish/model/hooks/use-infinite-parishes"
import { getParishLayout } from "./parishes-list.styles"
import { DeleteParishProvider, useDeleteParishContext } from "@/shared/lib/providers/delete-parish-context";
import { ParishWideCard } from "@/entities/parish/ui/parish-wide/parish-wide-card"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { StateMessage } from "@/shared/ui/state-message";
import { ParishWideCardSkeleton } from "@/entities/parish/ui/parish-wide/parish-wide-card-skeleton";

interface ParishesListProps {
  isAdmin: boolean,
  className?: string,
  initialParishes?: ParishWithRelationsTotals[],
  initialHasMore?: boolean,
}

export const ParishesListInner = memo(({
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
  const { confirmParishDelete } = useDeleteParishContext();

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
    confirmParishDelete(parish, () => removeParishes(parish.id));
  }, [removeParishes])


  if (error && !isLoading) return (
    <StateMessage variant="destructive">
      {t("errors.infinite-scroll-error")}
    </StateMessage>
  )

  if (!hasMore && !parishes.length) return (
    <StateMessage >
      {t("parishes-empty")}
    </StateMessage>
  )

  const PARISH_LAYOUT = useMemo(() => getParishLayout(isAdmin), [isAdmin])

  return (
    <ScrollArea className={cn("flex-1 min-h-0", className)}>
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
            {isLoading && <ParishWideCardSkeleton />}
          </div>
        )}
      </div>
    </ScrollArea>
  )
})

ParishesListInner.displayName = "ParishesListInner"

export const ParishesList = (props: ParishesListProps) => {
  return (
    <DeleteParishProvider>
      <ParishesListInner {...props} />
    </DeleteParishProvider>
  )
}