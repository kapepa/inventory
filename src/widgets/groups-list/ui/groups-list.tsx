"use client";

import { ScrollArea } from "@/shared/ui/scroll-area";
import { useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys";
import { useIntersectionObserver } from "@/shared/lib/hooks/use-intersection-observer";
import { useQueryParam } from "@/shared/lib/hooks/use-query-param";
import { ParishWithRelations } from "@/entities/parish/model/types";
import { useInfiniteParishes } from "@/entities/parish/model/hooks/use-infinite-parishes";
import { fetchParishes } from "@/entities/parish/api";
import { ParishShortHeader } from "@/entities/parish/ui/parish-short/parish-short-header";
import { ParishShortCard } from "@/entities/parish/ui/parish-short/parish-short-card";
import { ParishShortCardSkeleton } from "@/entities/parish/ui/parish-short/parish-short-card-skeleton";
import { StateMessage } from "@/shared/ui/state-message";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("groups-list");
  const params = useParams<{ id?: string }>();
  const [search] = useQueryParam(QUERY_PARAMS_KEYS.PARISHES_GROUPS_SEARCH);
  const { parishes, isLoading, error, hasMore, loadMore } = useInfiniteParishes<ParishWithRelations>({
    search, initialParishes, initialHasMore, fetchFnAction: fetchParishes
  })
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })

  const activeParishId = params.id || initialParishesId;

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  if (error && !isLoading) return (
    <StateMessage variant="destructive" >
      {t("errors.parishes")}
    </StateMessage>
  )

  if (!hasMore && !isLoading && !parishes.length) return (
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
                id={parish.id}
                parish={parish}
                className={CARD_CLASS}
                isActive={activeParishId === parish.id}
              />
            ))
          }
          {(hasMore || isLoading) && (
            <div ref={targetRef} className="w-full h-18 flex items-center justify-center">
              {isLoading && <ParishShortCardSkeleton />}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

GroupsList.displayName = 'GroupsList';