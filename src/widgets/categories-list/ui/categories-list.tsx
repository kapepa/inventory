"use client"

import { useInfiniteCategories, requestCategoriesWithProductCount, CategoryCard, CategoryCardSkeleton, CategoryHeader, CategoryShortStateMessage, CategoryWithProductCount } from "@/entities";
import { cn, QUERY_PARAMS_KEYS, ScrollArea, useIntersectionObserver, useQueryParam, LoaderSpin } from "@/shared";
import { useEffect } from "react";

interface CategoriesListProps {
  className?: string
  initialHasMore: boolean
  initialCategories: CategoryWithProductCount[]
}

const CARD_CLASS = "grid grid-cols-[1fr_1fr] lg:grid-cols-[8fr_1fr_2fr_1fr] items-center gap-4";

export const CategoriesList = ({ className, initialHasMore, initialCategories }: CategoriesListProps) => {
  const [search] = useQueryParam(QUERY_PARAMS_KEYS.CATEGORIES_SEARCH)
  const { categories, isLoading, hasMore, loadMore } = useInfiniteCategories(
    { search, initialHasMore, initialCategories, fetchFnAction: requestCategoriesWithProductCount }
  )
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  if (isLoading && categories.length === 0 && !initialCategories.length) return (
    <CategoryShortStateMessage className="flex flex-col h-full min-h-0">
      <LoaderSpin className="h-16 w-16" />
    </CategoryShortStateMessage>
  )

  return (
    <div className={cn("flex-1 min-h-0 flex flex-col", className)}>
      <CategoryHeader className={cn("", CARD_CLASS)} />
      <ScrollArea className="flex-1 min-h-0 ">
        <div className={cn("flex flex-col max-w-lg lg:max-w-full h-full min-h-0 gap-y-3 m-auto", className)}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              className={cn("", CARD_CLASS)} />
          ))}
          {(hasMore || isLoading) && (
            <div ref={targetRef} className="w-full h-auto flex items-center justify-center min-h-14">
              {isLoading && <CategoryCardSkeleton className={cn("", CARD_CLASS)} />}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

CategoriesList.displayName = "CategoriesList"