"use client"

import { fetchProductsWide, ProductsShortStateMessage, ProductsWideBody, ProductWithRelationsWide, useInfiniteProducts } from "@/entities"
import { cn, useIntersectionObserver } from "@/shared"
import { useTranslations } from "next-intl"
import { useEffect } from "react"

const CARD_CLASS = "grid"

interface ProductsListProps {
  className?: string
  initialParishId: string
  initialProducts: ProductWithRelationsWide[]
  initialHasMore: boolean,
}

export const ProductsList = ({ initialParishId, initialProducts, initialHasMore, className }: ProductsListProps) => {
  const t = useTranslations('products-list');
  const { products, isLoading, error, hasMore, loadMore } = useInfiniteProducts<ProductWithRelationsWide>({ parishId: initialParishId, initialProducts, initialHasMore, fetchFnAction: fetchProductsWide });
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  if (error) return (
    <ProductsShortStateMessage className="text-destructive">
      {t("errors.infinite-scroll-error")}
    </ProductsShortStateMessage>
  )

  return (
    <div className={cn("", className)}>
      <div>
        <ProductsWideBody />
        {(hasMore || isLoading) && (
          <div ref={targetRef} className="w-full h-16 flex items-center justify-center">
            {/* {isLoading && <ProductShortCardSkeleton className={CARD_CLASS} />} */}
          </div>
        )}
      </div>
    </div>
  )
}

ProductsList.displayName = "ProductsList"