"use client"

import { ScrollArea, StateMessage } from "@/shared/ui"
import { useTranslations } from "next-intl"
import { memo, useCallback, useEffect } from "react"
import { cn } from "@/shared/lib/utils";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys"
import { useQueryParam } from "@/shared/lib/hooks/use-query-param"
import { useIntersectionObserver } from "@/shared/lib/hooks"
import { ProductWithRelationsWide } from "@/entities/product/model/types"
import { useHydratedIsAdmin } from "@/features/auth/model/hooks/use-hydrated-user"
import { useInfiniteProducts } from "@/entities/product/model/hooks/use-infinite-products"
import { useViewProduct } from "@/features/view-product-details/model/hooks/use-view-product"
import { useDeleteProduct } from "@/features/delete-resource/model/hooks/use-delete-product"
import { ProductsWideCard, ProductsWideCardSkeleton } from "@/entities/product/ui/products-wide"
import { ProductsActionMode } from "../model/types"
import { useFetchProductsAction } from "../model/hooks/use-fetch-products-action"

const PRODUCTD_GRID_BASE = "grid grid-cols-2 lg:gap-8 auto-rows-auto"

const PRODUCTD_GRID_LAYOUT = cn(
  PRODUCTD_GRID_BASE,
  "lg:grid-cols-[1fr_1fr_8fr_3fr_3fr_2fr_2fr]",
)

const PRODUCTD_GRID_LAYOUT_ADMIN = cn(
  PRODUCTD_GRID_BASE,
  "lg:grid-cols-[1fr_1fr_8fr_3fr_3fr_2fr_2fr_1fr]",
)

interface ProductsListProps {
  className?: string
  initialcategoryId?: string
  initialParishId: string | null
  initialProducts: ProductWithRelationsWide[]
  initialHasMore: boolean,
  mode?: ProductsActionMode
}

export const ProductsList = memo(({ initialParishId, initialProducts, initialHasMore, initialcategoryId, className, mode }: ProductsListProps) => {
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
    <StateMessage variant="destructive">
      {t("errors.infinite-scroll-error")}
    </StateMessage>
  )

  if (!hasMore && !products.length) return (
    <StateMessage>
      {t("products-empty")}
    </StateMessage>
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
})

ProductsList.displayName = "ProductsList"

export const ProductsListSkeleton = ({ className }: { className?: string }) => {
  const isAdmin = false
  const PRODUCTD_LAYOUT = PRODUCTD_GRID_LAYOUT

  return (
    <div className="flex-1 min-h-0 flex flex-col w-full">
      <ScrollArea className="flex-1 min-h-0 w-full mx-auto max-w-lg lg:max-w-full">
        <div className={cn("flex flex-col gap-3 pb-6 md:pb-16", className)}>
          {
            Array.from({ length: 4 }).map((_, index) => (
              <ProductsWideCardSkeleton
                key={`products-list-skeleton${index}`}
                isAdmin={isAdmin}
                className={PRODUCTD_LAYOUT}
              />
            ))
          }
        </div>
      </ScrollArea>
    </div>
  )
}

ProductsListSkeleton.displayName = "ProductsListSkeleton"