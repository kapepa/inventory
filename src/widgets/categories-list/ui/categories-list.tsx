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
import { DeleteCategoryProvider, useDeleteCategoryContext } from "@/shared/lib/providers/delete-category-context";;
import { CategoryCard } from "@/entities/category/ui/category-card";
import { StateMessage } from "@/shared/ui";
import { CategoryCardSkeleton } from "@/entities/category/ui/category-card-skeleton";

interface CategoriesListProps {
  className?: string
  initialHasMore: boolean
  initialCategories: CategoryWithProductCount[]
}

const CARD_CLASS = "grid grid-cols-[1fr_1fr] lg:grid-cols-[8fr_1fr_2fr_1fr] items-center gap-4";

export const CategoriesListInner = ({ className, initialHasMore, initialCategories }: CategoriesListProps) => {
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
    <StateMessage variant="destructive" >
      {t("errors.infinite-scroll-error")}
    </StateMessage>
  )

  if (!hasMore && !categories.length) return (
    <StateMessage>
      {t("categories-empty")}
    </StateMessage>
  )

  return (
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
            {isLoading && <CategoryCardSkeleton />}
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

CategoriesListInner.displayName = "CategoriesListInner"

export const CategoriesList = (props: CategoriesListProps) => {
  return (
    <DeleteCategoryProvider>
      <CategoriesListInner {...props} />
    </DeleteCategoryProvider>
  )
}

CategoriesList.displayName = "CategoriesList"