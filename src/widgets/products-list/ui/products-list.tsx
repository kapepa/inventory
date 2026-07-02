"use client"

import { ProductsStateMessage, ProductsWideCard, ProductsWideCardSkeleton, ProductWithRelationsWide, useInfiniteProducts } from "@/entities"
import { useDeleteProduct, useViewProduct } from "@/features"
import { cn, QUERY_PARAMS_KEYS, ScrollArea, useIntersectionObserver, useQueryParam, LoaderSpin } from "@/shared"
import { useTranslations } from "next-intl"
import { useCallback, useEffect } from "react"
import { ProductsActionMode, useFetchProductsAction } from "../model"

const CARD_CLASS = cn(
  "grid",
  "grid-cols-2 lg:gap-6 auto-rows-auto",
  "lg:grid-cols-[minmax(auto,12px)_minmax(auto,48px)_minmax(200px,400px)_minmax(100px,120px)_minmax(110px,150px)_minmax(40px,60px)_minmax(85px,100px)_1fr] lg:gap-8",
)

interface ProductsListProps {
  className?: string
  initialcategoryId?: string
  initialParishId: string | null
  initialProducts: ProductWithRelationsWide[]
  initialHasMore: boolean,
  mode?: ProductsActionMode
}

export const ProductsList = ({ initialParishId, initialProducts, initialHasMore, initialcategoryId, className, mode }: ProductsListProps) => {
  const t = useTranslations('products-list');
  const [search] = useQueryParam(QUERY_PARAMS_KEYS.PRODUCTS_SEARCH)
  const [categoryId] = useQueryParam(QUERY_PARAMS_KEYS.CATEGORY);
  const [specification] = useQueryParam(QUERY_PARAMS_KEYS.SPECIFICATION);
  const fetchFnAction = useFetchProductsAction({ mode, categoryId: initialcategoryId || categoryId || undefined });
  const { products, isLoading, error, hasMore, loadMore, removeProduct } = useInfiniteProducts<ProductWithRelationsWide>(
    { search, categoryId, specification, parishId: initialParishId, initialProducts, initialHasMore, fetchFnAction: fetchFnAction }
  );
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

  if (error && !isLoading) return (
    <ProductsStateMessage className="text-destructive">
      {t("errors.infinite-scroll-error")}
    </ProductsStateMessage>
  )

  if (isLoading && products.length === 0 && !initialProducts.length) return (
    <ProductsStateMessage className="flex flex-col h-full min-h-0">
      <LoaderSpin className="h-16 w-16" />
    </ProductsStateMessage>
  )

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <ScrollArea className="flex-1 min-h-0">
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
            <div ref={targetRef} className="w-full h-auto flex items-center justify-center min-h-14">
              {isLoading && <ProductsWideCardSkeleton className={cn("", CARD_CLASS)} />}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

ProductsList.displayName = "ProductsList"