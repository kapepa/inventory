"use client"

import { useEffect } from "react"
import { ParishCard, ParishWithRelations } from "@/entities/parish"
import { Skeleton } from "@/shared"
import { useIntersectionObserver } from "@/shared/lib/hooks/use-intersection-observer"
import { useInfiniteParishes } from "../model/use-infinite-parishes"
import { cn } from "@/shared"
import { useTranslations } from "next-intl"

export const PARISH_GRID_LAYOUT = "grid grid-cols-[minmax(300px,_1fr)_60px_110px_155px_175px_60px] items-center gap-4";

interface ParishesListProps {
  onParishClick?: (parish: ParishWithRelations) => void
  className?: string
  initialParishes?: ParishWithRelations[]
  initialHasMore?: boolean
}

export const ParishesList = ({
  onParishClick,
  className,
  initialParishes = [],
  initialHasMore = true
}: ParishesListProps) => {
  const t = useTranslations('parishe');
  const { parishes, isLoading, error, hasMore, loadMore } = useInfiniteParishes("", initialParishes, initialHasMore)

  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: "100px",
  })

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading])

  if (error) return <div className="text-destructive text-center py-4">{error}</div>

  return (
    <div className={cn("w-full", className)}>
      <div className="overflow-x-auto py-4">
        <div className="min-w-250">

          <div className={cn(PARISH_GRID_LAYOUT, "px-6 py-3 text-[11px] font-bold text-muted-foreground uppercase tracking-widest")}>
            <div>{t('list.header.name')}</div>
            <div>{t("list.header.details")}</div>
            <div>{t('list.header.count')}</div>
            <div>{t('list.header.date')}</div>
            <div>{t('list.header.amount')}</div>
            <div >{t('list.header.delete')}</div>
          </div>

          <div className="flex flex-col gap-3">
            {parishes.map((parish) => (
              <ParishCard
                key={parish.id}
                parish={parish}
                onClick={onParishClick}
                className={PARISH_GRID_LAYOUT}
              />
            ))}
          </div>

          {hasMore && (
            <div ref={targetRef} className="flex flex-col gap-3 mt-3">
              {isLoading && Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className={cn(PARISH_GRID_LAYOUT, "h-24 w-full")} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}