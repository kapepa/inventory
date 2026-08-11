"use client"

import { useCallback, useEffect, useMemo } from "react"
import { ScrollArea } from "@/shared/ui/scroll-area"
import { useTranslations } from "next-intl"
import { cn } from "@/shared/lib/utils";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys"
import { useQueryParam } from "@/shared/lib/hooks/use-query-param"
import { useIntersectionObserver } from "@/shared/lib/hooks/use-intersection-observer"
import { ProductWithRelationsWide } from "@/entities/product/model/types"
import { useInfiniteProducts } from "@/entities/product/model/hooks/use-infinite-products"
import { useViewProduct } from "@/features/view-product-details/model/hooks/use-view-product"
import { ProductsActionMode } from "../model/types"
import { useFetchProductsAction } from "../model/hooks/use-fetch-products-action"
import { DeleteProductProvider, useDeleteProductContext } from "@/shared/lib/providers/delete-product-context";
import { getProductsLayout } from "./products-grid-layout-styles";
import { StateMessage } from "@/shared/ui/state-message";
import { ProductsWideCard } from "@/entities/product/ui/products-wide/products-wide-card";
import { ProductsWideCardSkeleton } from "@/entities/product/ui/products-wide/products-wide-card-skeletob";
import { AppLocale } from "@/shared/lib/i18n/config";

interface ProductsListProps {
  mode?: ProductsActionMode
  locale: AppLocale
  isAdmin: boolean
  className?: string
  initialcategoryId?: string
  initialParishId: string | null
  initialProducts: ProductWithRelationsWide[]
  initialHasMore: boolean,
}

export const ProductsListInner = ({ locale, isAdmin, initialParishId, initialProducts, initialHasMore, initialcategoryId, className, mode }: ProductsListProps) => {
  const t = useTranslations('products-list');
  const [search] = useQueryParam(QUERY_PARAMS_KEYS.PRODUCTS_SEARCH)
  const [categoryId] = useQueryParam(QUERY_PARAMS_KEYS.CATEGORY);
  const [specification] = useQueryParam(QUERY_PARAMS_KEYS.SPECIFICATION);
  const fetchFnAction = useFetchProductsAction({ mode, categoryId: initialcategoryId || categoryId || undefined });
  const { products, isLoading, error, hasMore, loadMore, removeProduct } = useInfiniteProducts<ProductWithRelationsWide>(
    { search, categoryId, specification, parishId: initialParishId, initialProducts, initialHasMore, fetchFnAction: fetchFnAction }
  );
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })
  const { confirmProductDelete } = useDeleteProductContext()
  const { productDetails } = useViewProduct()

  const handlerDeleteProduct = useCallback((product: ProductWithRelationsWide) => {
    confirmProductDelete(product, () => { removeProduct(product.id) });
  }, [removeProduct])

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  const PRODUCTD_LAYOUT = useMemo(() => getProductsLayout(isAdmin), [isAdmin])

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

  return (
    <div className="flex-1 min-h-0 flex flex-col w-full">
      <ScrollArea className="flex-1 min-h-0 w-full mx-auto max-w-lg lg:max-w-full">
        <div className={cn("flex flex-col gap-3 pb-6 md:pb-16", className)}>
          {
            products.map((product) => (
              <ProductsWideCard
                key={product.id}
                locale={locale}
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
              {isLoading && <ProductsWideCardSkeleton />}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

ProductsListInner.displayName = "ProductsListInner"

export const ProductsList = (props: ProductsListProps) => {
  return (
    <DeleteProductProvider>
      <ProductsListInner {...props} />
    </DeleteProductProvider>
  )
}

ProductsList.displayName = "ProductsList"