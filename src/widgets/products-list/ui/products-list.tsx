"use client"

import { fetchProductsWide, ProductsShortStateMessage, ProductsWideCard, ProductsWideCardSkeleton, ProductWithRelationsWide, useInfiniteProducts } from "@/entities"
import { useDeleteProduct, useViewProduct } from "@/features"
import { cn, ScrollArea, useIntersectionObserver } from "@/shared"
import { useTranslations } from "next-intl"
import { useCallback, useEffect } from "react"

const CARD_CLASS = cn(
  "grid",
  "grid-cols-2 lg:gap-6 auto-rows-auto",
  "lg:grid-cols-[minmax(auto,12px)_minmax(auto,48px)_minmax(200px,400px)_minmax(100px,120px)_minmax(110px,150px)_minmax(40px,60px)_minmax(85px,100px)_1fr] lg:gap-8",
)

interface ProductsListProps {
  className?: string
  initialParishId: string
  initialProducts: ProductWithRelationsWide[]
  initialHasMore: boolean,
}

export const ProductsList = ({ initialParishId, initialProducts, initialHasMore, className }: ProductsListProps) => {
  const t = useTranslations('products-list');
  const { products, isLoading, error, hasMore, loadMore, removeProduct } = useInfiniteProducts<ProductWithRelationsWide>({ parishId: initialParishId, initialProducts, initialHasMore, fetchFnAction: fetchProductsWide });
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })
  const { productDetails } = useViewProduct()
  const { confirmDeleteProduct } = useDeleteProduct()

  const handlerDeleteProduct = useCallback((product: ProductWithRelationsWide) => {
    confirmDeleteProduct(product, () => { removeProduct(product.id) });
  }, [confirmDeleteProduct, removeProduct])

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
    <div className="flex-1 min-h-0 flex flex-col">
      <ScrollArea className="flex-1 overflow-y-auto">
        <div className={cn("flex flex-col gap-3 max-w-lg lg:max-w-full m-auto", className)}>
          {
            products.map((product) => (
              <ProductsWideCard
                key={product.id}
                product={product}
                onDeleteProduct={handlerDeleteProduct}
                openProductModal={productDetails}
                className={cn("", CARD_CLASS)}
              />
            ))
          }
          {(hasMore || isLoading) && (
            <div ref={targetRef} className="w-full h-16 flex items-center justify-center">
              <ProductsWideCardSkeleton className={cn("", CARD_CLASS)} />
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

ProductsList.displayName = "ProductsList"