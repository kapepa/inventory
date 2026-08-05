"use client"

import { useParishesStore } from "@/entities/parish/model/parish-store"
import { fetchProductsShort } from "@/entities/product/api"
import { useInfiniteProducts } from "@/entities/product/model/hooks/use-infinite-products"
import { ProductWithRelationsShort } from "@/entities/product/model/types"
import { AddProductButton } from "@/features/add-product/ui/add-product-button"
import { useHydratedIsAdmin } from "@/features/auth/model/hooks/use-hydrated-user"
import { useDeleteProduct } from "@/features/delete-resource/model/hooks/use-delete-product"
import { useViewProduct } from "@/features/view-product-details/model/hooks/use-view-product"
import { cn } from "@/shared/lib/utils";
import { useIntersectionObserver } from "@/shared/lib/hooks"
import { useActiveParishId } from "@/shared/lib/hooks/use-active-parish-id"
import { LoaderSpin } from "@/shared/ui"
import { useTranslations } from "next-intl"
import { memo, useCallback, useEffect, useMemo } from "react"
import { StateMessageDynamic } from "@/shared/ui-dynamic/state-message-dynamic"
import { getRelationshLayout } from "./relations-grid-layout-styles"
import { ProductsShortBody, ProductsShortBodySkeleton } from "@/entities/product/ui/products-short/products-short-body"
import { ProductShortCard, ProductShortCardSkeleton } from "@/entities/product/ui/products-short/product-short-card"

interface GroupsRelationsProps {
  className?: string,
  initialHasMore?: boolean,
  initialProducts?: ProductWithRelationsShort[],
  initialParishesId: string | null
  initialParishTitle: string
}

export const GroupsRelations = memo(({ className, initialHasMore, initialProducts, initialParishesId, initialParishTitle }: GroupsRelationsProps) => {
  const t = useTranslations('groups-relations');
  const isAdmin = useHydratedIsAdmin();
  const activeParishe = useParishesStore((state) => state.activeParishe)
  const storeActiveParisheTitle = activeParishe?.translations[0]?.title
  const [activeParishId, setActiveParishId] = useActiveParishId(initialParishesId);
  const { products, isLoading, error, clearProducts, hasMore, loadMore, addProduct, removeProduct } = useInfiniteProducts<ProductWithRelationsShort>({
    parishId: activeParishId, initialProducts, initialHasMore, fetchFnAction: fetchProductsShort
  });
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })
  const { productDetails } = useViewProduct()
  const { confirmDeleteProduct } = useDeleteProduct()

  const activeParishTitle = storeActiveParisheTitle ? storeActiveParisheTitle : initialParishTitle;

  const GROUPS_LAYOUT = useMemo(
    () => getRelationshLayout(isAdmin),
    [isAdmin]
  )

  const openProductModal = useCallback((product: ProductWithRelationsShort) => {
    productDetails(product)
  }, [productDetails])

  const handlerDeleteProduct = useCallback((product: ProductWithRelationsShort) => {
    confirmDeleteProduct(product, () => { removeProduct(product.id) });
  }, [confirmDeleteProduct, removeProduct])

  const handleClose = useCallback(() => {
    setActiveParishId("");
    clearProducts();
  }, [setActiveParishId, clearProducts])

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  if (!activeParishId) return (
    <StateMessageDynamic>
      {t("parishes-not-selected")}
    </StateMessageDynamic>
  )

  if (error && !isLoading && !error.includes("cancel")) return (
    <StateMessageDynamic variant="destructive">
      {t("parishes-error")}
    </StateMessageDynamic>
  )

  if (isLoading && products.length === 0) return (
    <div className="flex flex-col h-full min-h-0 w-full justify-center items-center">
      <LoaderSpin className="h-16 w-16" />
    </div>
  )

  return (
    <div className={cn("flex flex-col h-full min-h-0", className)}>
      <ProductsShortBody
        title={activeParishTitle}
        actions={isAdmin ? <AddProductButton parishId={activeParishId} onSuccessAction={addProduct} /> : null}
        onCloseActions={handleClose}
      >
        <div className="flex flex-col">
          {
            products.map((product) => (
              <ProductShortCard
                key={product.id}
                product={product}
                isAdmin={isAdmin}
                className={GROUPS_LAYOUT}
                openProductModal={openProductModal}
                onDeleteProduct={handlerDeleteProduct}
              />
            ))
          }
          {(hasMore || isLoading) && (
            <div ref={targetRef} className="w-full h-16 flex items-center justify-center">
              {isLoading && <ProductShortCardSkeleton isAdmin={isAdmin} className={GROUPS_LAYOUT} />}
            </div>
          )}
          {(!hasMore && !products.length) && (
            <div className="w-full h-16 flex items-center justify-center">
              <span className="text-sm text-muted-foreground font-semibold">{t("products.not-found")}</span>
            </div>
          )}
        </div>
      </ProductsShortBody>
    </div>
  )
})

GroupsRelations.displayName = "GroupsRelations"

export const GroupsRelationsSkeleton = ({ className }: { className?: string }) => {
  const isAdmin = false
  const GROUPS_LAYOUT = useMemo(
    () => getRelationshLayout(isAdmin),
    [isAdmin]
  )

  return (
    <div className={cn("flex flex-col h-full min-h-0", className)}>
      <ProductsShortBodySkeleton>
        <div className="flex flex-col">
          {
            Array.from({ length: 3 }).map((_, index) => (
              <ProductShortCardSkeleton
                key={`groups-relations-skeleton-${index}`}
                isAdmin={isAdmin}
                className={GROUPS_LAYOUT}
              />
            ))
          }
        </div>
      </ProductsShortBodySkeleton>
    </div>
  )
}

GroupsRelationsSkeleton.displayName = "GroupsRelationsSkeleton"