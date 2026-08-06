"use client"

import { useCallback, useEffect } from "react";
import { requestCategoriesWithProductCount } from "@/entities/category/api";
import { useCategoriesStore } from "@/entities/category/model/categories-store";
import { useInfiniteCategories } from "@/entities/category/model/hooks/use-infinite-categories";
import { CategoryWithProductCount, isCategoryWithProductCount } from "@/entities/category/model/types";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys";
import { cn } from "@/shared/lib/utils";
import { useIntersectionObserver } from "@/shared/lib/hooks";
import { useQueryParam } from "@/shared/lib/hooks/use-query-param";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { useTranslations } from "next-intl";
import { StateMessageDynamic } from "@/shared/ui-dynamic/state-message-dynamic";
import { useDeleteCategoryContext } from "@/shared/lib/providers/category-parish-context";
import { CategoryHeader, CategoryHeaderSkeleton } from "@/entities/category/ui/category-header";
import { CategoryCard, CategoryCardSkeleton } from "@/entities/category/ui/category-card";

interface CategoriesListProps {
  className?: string
  initialHasMore: boolean
  initialCategories: CategoryWithProductCount[]
}

const CARD_CLASS = "grid grid-cols-[1fr_1fr] lg:grid-cols-[8fr_1fr_2fr_1fr] items-center gap-4";

export const CategoriesList = ({ className, initialHasMore, initialCategories }: CategoriesListProps) => {
  const t = useTranslations('categories-list');
  const [search] = useQueryParam(QUERY_PARAMS_KEYS.CATEGORIES_SEARCH)
  const { newCategory, addNewCategory } = useCategoriesStore()
  const { categories, isLoading, error, hasMore, loadMore, addCategory, removeCategory } = useInfiniteCategories(
    { search, initialHasMore, initialCategories, fetchFnAction: requestCategoriesWithProductCount }
  )
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })
  const { confirmCategoryDelete } = useDeleteCategoryContext()

  const handlerDeleteProduct = useCallback((category: CategoryWithProductCount) => {
    confirmCategoryDelete(category, () => { removeCategory(category.id) });
  }, [removeCategory])

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  useEffect(() => {
    if (newCategory && isCategoryWithProductCount(newCategory)) {
      addCategory(newCategory)
      addNewCategory(null)
    }
  }, [newCategory, addCategory, addNewCategory])

  if (error && !isLoading) return (
    <StateMessageDynamic variant="destructive" >
      {t("errors.infinite-scroll-error")}
    </StateMessageDynamic>
  )

  if (!hasMore && !categories.length) return (
    <StateMessageDynamic>
      {t("categories-empty")}
    </StateMessageDynamic>
  )

  return (
    <div className={cn("flex-1 min-h-0 flex flex-col", className)}>
      <CategoryHeader className={cn("", CARD_CLASS)} />
      <ScrollArea className="flex-1 min-h-0 ">
        <div className={cn("flex flex-col max-w-lg lg:max-w-full h-full min-h-0 gap-y-3 m-auto pb-6 md:pb-16", className)}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              className={cn("", CARD_CLASS)}
              onDeleteCategory={handlerDeleteProduct}
            />
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

export const CategoriesListSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex-1 min-h-0 flex flex-col", className)}>
      <CategoryHeaderSkeleton className={cn("", CARD_CLASS)} />
      <ScrollArea className="flex-1 min-h-0 ">
        <div className={cn("flex flex-col max-w-lg lg:max-w-full h-full min-h-0 gap-y-3 m-auto pb-6 md:pb-16", className)}>
          {
            Array.from({ length: 3 }).map((_, index) => (
              <CategoryCardSkeleton
                key={`categories-list-skeleton-${index}`}
                className={cn("", CARD_CLASS)}
              />
            ))
          }
        </div>
      </ScrollArea>
    </div>
  );
}

CategoriesListSkeleton.displayName = "CategoriesListSkeleton"