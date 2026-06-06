"use client";

import { useTranslations } from "next-intl";
import { ParishShortCard, ParishShortCardSkeleton, ParishShortHeader, ParishWithRelations, useInfiniteParishes } from "@/entities";
import { cn, QUERY_PARAMS_KEYS, useIntersectionObserver, useQueryParam, useThrottle } from "@/shared";
import { useCallback, useEffect } from "react";

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

export const GroupsList = ({
  className,
  initialParishes = [],
  initialHasMore = true,
  initialParishesId,
}: GroupsListProps) => {
  const t = useTranslations('groups');
  const [search] = useQueryParam(QUERY_PARAMS_KEYS.PARISHES_SEARCH);
  const [activeParishId, setActiveParishId] = useQueryParam(QUERY_PARAMS_KEYS.ACTIVE_PARISH);
  const { parishes, isLoading, error, hasMore, loadMore } = useInfiniteParishes(search, initialParishes, initialHasMore)
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })
  const getActiveParish = activeParishId || initialParishesId

  const selectParishesActions = useCallback((id: string) => {
    setActiveParishId((prev: string | null) => prev === id ? null : id);
  }, [setActiveParishId])

  const throttleSelectParishesActions = useThrottle(selectParishesActions, 1000);

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  if (error) return <div className="text-destructive text-center py-4">{t("groups-list.errors.parishes")}</div>

  return (
    <div className={className}>
      <div className="flex flex-col gap-3 pb-2">
        <ParishShortHeader
          className={cn(CARD_CLASS, "pr-14")}
        />
        {
          parishes.map(parish => (
            <ParishShortCard
              key={parish.id}
              parish={parish}
              className={CARD_CLASS}
              selectParishesActions={throttleSelectParishesActions}
              isActive={parish.id === getActiveParish}
            />
          ))
        }
      </div>
      {(hasMore || isLoading) && (
        <div ref={targetRef} className="flex flex-col gap-3 mt-3">
          {isLoading && Array.from({ length: 2 }).map((_, i) => (
            <ParishShortCardSkeleton key={i} className={CARD_CLASS} />
          ))}
        </div>
      )}
    </div>
  );
}

GroupsList.displayName = 'GroupsList';
