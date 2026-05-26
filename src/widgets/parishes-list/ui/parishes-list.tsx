"use client"

import { useEffect } from "react"
import { ParishCard, Parish } from "@/entities/parish"
import { Skeleton } from "@/shared"
import { useIntersectionObserver } from "@/shared/lib/hooks/use-intersection-observer"
import { useInfiniteParishes } from "../model/use-infinite-parishes"
import { cn } from "@/shared"
import styles from "./parishes-list.module.css"

interface ParishesListProps {
  onParishClick?: (parish: Parish) => void
  className?: string
  initialParishes?: Parish[]
  initialHasMore?: boolean
}

export const ParishesList = ({
  onParishClick,
  className,
  initialParishes = [],
  initialHasMore = true
}: ParishesListProps) => {
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

  if (error) {
    return <div className={styles.error}>{error}</div>
  }

  if (!isLoading && parishes.length === 0) {
    return <div className={styles.empty}>Нет приходов</div>
  }


  return (
    <div className={cn(styles.list, className)}>
      {parishes.map((parish) => (
        <ParishCard key={parish.id} parish={parish} onClick={onParishClick} />
      ))}

      {hasMore && (
        <div ref={targetRef} className={styles.loader}>
          {isLoading && (
            <>
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </>
          )}
        </div>
      )}
    </div>
  )
}
