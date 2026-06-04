"use client";

import { useTranslations } from "next-intl";
import { ParishShortCard, ParishShortCardSkeleton, ParishShortHeader, ParishWithRelations, useInfiniteParishes } from "@/entities";
import { cn, QUERY_PARAMS_KEYS, useIntersectionObserver, useQueryParam } from "@/shared";
import { useEffect } from "react";

interface GroupsListProps {
  className?: string;
}

const PARISH_GRID_LAYOUT = "grid grid-cols-[1fr_1fr_2fr] items-center gap-4"

interface GroupsListProps {
  className?: string,
  initialParishes?: ParishWithRelations[],
  initialHasMore?: boolean,
}

export const GroupsList = ({
  className,
  initialParishes = [],
  initialHasMore = true,
}: GroupsListProps) => {
  const t = useTranslations('groups');
  const [search] = useQueryParam(QUERY_PARAMS_KEYS.PARISHES_SEARCH);
  const { parishes, isLoading, error, hasMore, loadMore } = useInfiniteParishes(search, initialParishes, initialHasMore)
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  if (error) return <div className="text-destructive text-center py-4">{t("parishes-list.error")}</div>

  return (
    <div className={className}>
      <ParishShortHeader
        className={cn(PARISH_GRID_LAYOUT, "pr-14")}
      />
      <div className="flex flex-col gap-3 pb-2">
        {
          parishes.map(parish => (
            <ParishShortCard
              key={parish.id}
              parish={parish}
              className={cn(PARISH_GRID_LAYOUT)}
            />
          ))
        }
      </div>
      {(hasMore || isLoading) && (
        <div ref={targetRef} className="flex flex-col gap-3 mt-3">
          {isLoading && Array.from({ length: 2 }).map((_, i) => (
            <ParishShortCardSkeleton key={i} className={PARISH_GRID_LAYOUT} />
          ))}
        </div>
      )}
    </div>
  );
}

GroupsList.displayName = 'GroupsList';
