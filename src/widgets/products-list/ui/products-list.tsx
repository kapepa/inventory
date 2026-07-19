"use client"

import { ProductsStateMessage, ProductsWideCard, ProductsWideCardSkeleton, ProductWithRelationsWide, useInfiniteProducts } from "@/entities"
import { useDeleteProduct, useHydratedIsAdmin, useViewProduct } from "@/features"
import { cn, QUERY_PARAMS_KEYS, ScrollArea, useIntersectionObserver, useQueryParam, LoaderSpin } from "@/shared"
import { useTranslations } from "next-intl"
import { useCallback, useEffect } from "react"
import { ProductsActionMode, useFetchProductsAction } from "../model"

const PRODUCTD_GRID_BASE = "grid grid-cols-2 lg:gap-8 auto-rows-auto"

const PRODUCTD_GRID_LAYOUT = cn(
  PRODUCTD_GRID_BASE,
  "lg:grid-cols-[minmax(auto,12px)_minmax(auto,48px)_minmax(200px,_1fr)_minmax(100px,120px)_minmax(110px,150px)_minmax(40px,60px)_minmax(85px,100px)] ",
)

const PRODUCTD_GRID_LAYOUT_ADMIN = cn(
  PRODUCTD_GRID_BASE,
  "lg:grid-cols-[minmax(auto,12px)_minmax(auto,48px)_minmax(200px,_1fr)_minmax(100px,120px)_minmax(110px,150px)_minmax(40px,60px)_minmax(85px,100px)_1fr] ",
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
  const isAdmin = useHydratedIsAdmin();
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

  const PRODUCTD_LAYOUT = isAdmin ? PRODUCTD_GRID_LAYOUT_ADMIN : PRODUCTD_GRID_LAYOUT

  return (
    <div className="flex-1 min-h-0 flex flex-col w-full">
      <ScrollArea className="flex-1 min-h-0 w-full mx-auto max-w-lg lg:max-w-full">
        <div className={cn("flex flex-col gap-3 pb-6 md:pb-16", className)}>
          {
            products.map((product) => (
              <ProductsWideCard
                key={product.id}
                product={product}
                isAdmin={isAdmin}
                onDeleteProduct={handlerDeleteProduct}
                openProductModal={productDetails}
                className={PRODUCTD_LAYOUT}
              />
            ))
          }
          {(hasMore || isLoading) && (
            <div ref={targetRef} className="w-full h-auto flex items-center justify-center min-h-14">
              {isLoading && <ProductsWideCardSkeleton isAdmin={isAdmin} className={PRODUCTD_LAYOUT} />}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

ProductsList.displayName = "ProductsList"