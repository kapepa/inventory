"use client";

import { useTranslations } from "next-intl";
import { fetchParishes, ParishShortCard, ParishShortCardSkeleton, ParishShortHeader, ParishWithRelations, useInfiniteParishes, useParishesStore } from "@/entities";
import { cn, QUERY_PARAMS_KEYS, ScrollArea, StateMessage, useActiveParishId, useIntersectionObserver, useQueryParam, useThrottle } from "@/shared";
import { memo, useCallback, useEffect } from "react";

interface GroupsListProps {
  className?: string;
}

interface GroupsListProps {
  className?: string,
  initialParishes?: ParishWithRelations[],
  initialHasMore?: boolean,
  initialParishesId: string | null
}

const CARD_CLASS = "grid grid-cols-[1fr_1fr_2fr] items-center gap-4";

export const GroupsList = memo(({
  className,
  initialParishes = [],
  initialHasMore = true,
  initialParishesId,
}: GroupsListProps) => {
  const t = useTranslations('groups-list');
  const [search] = useQueryParam(QUERY_PARAMS_KEYS.PARISHES_SEARCH);
  const setActiveParishe = useParishesStore((state) => state.setActiveParishe)
  const [activeParishId, setActiveParishId] = useActiveParishId(initialParishesId);
  const { parishes, isLoading, error, hasMore, loadMore } = useInfiniteParishes<ParishWithRelations>({
    search, initialParishes, initialHasMore, fetchFnAction: fetchParishes
  })
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })

  const selectParishesActions = useCallback((id: string) => {
    setActiveParishId((prev: string | null) => prev === id ? null : id);
  }, [setActiveParishId])

  const throttleSelectParishesActions = useThrottle(selectParishesActions, 1000);

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  useEffect(() => {
    if (activeParishId) {
      const activeParish = parishes.find(p => p.id === activeParishId);
      if (activeParish) setActiveParishe(activeParish);
    }
  }, [activeParishId, parishes, setActiveParishe])

  if (error && !isLoading) return (
    <StateMessage variant="destructive" >
      {t("errors.parishes")}
    </StateMessage>
  )

  if (!hasMore && !parishes.length) return (
    <StateMessage>
      {t("parishes-empty")}
    </StateMessage>
  )

  return (
    <div className={cn("flex flex-col h-full min-h-0 gap-y-3", className)}>
      <ParishShortHeader
        className={cn(CARD_CLASS)}
      />
      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col gap-y-3 pb-6 md:pb-16">
          {
            parishes.map(parish => (
              <ParishShortCard
                key={parish.id}
                parish={parish}
                className={CARD_CLASS}
                selectParishesActions={throttleSelectParishesActions}
                isActive={parish.id === activeParishId}
              />
            ))
          }
          {(hasMore || isLoading) && (
            <div ref={targetRef} className="w-full h-18 flex items-center justify-center">
              {isLoading && <ParishShortCardSkeleton className={CARD_CLASS} />}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
})

GroupsList.displayName = 'GroupsList';

export const GroupsListSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col h-full min-h-0 gap-y-3", className)}>
      <ParishShortHeader
        className={cn(CARD_CLASS)}
      />
      <ScrollArea className="flex-1 min-h-0">
        <div className="flex flex-col gap-y-3 pb-6 md:pb-16">
          {
            Array.from({ length: 3 }).map((_, index) => (
              <ParishShortCardSkeleton
                key={`groups-list-skeleton-${index}`}
                className={CARD_CLASS}
              />
            ))
          }
        </div>
      </ScrollArea>
    </div>
  );
}

GroupsListSkeleton.displayName = 'GroupsListSkeleton';

