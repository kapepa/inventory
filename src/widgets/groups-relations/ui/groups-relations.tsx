"use client"

import { useParishesStore, fetchProductsShort, ProductShortCard, ProductShortCardSkeleton, ProductsShortBody, ProductsStateMessage, ProductWithRelationsShort, useInfiniteProducts } from "@/entities"
import { ProductCreateButton, useDeleteProduct, useHydratedIsAdmin, useViewProduct } from "@/features"
import { cn, useActiveParishId, useIntersectionObserver, LoaderSpin } from "@/shared"
import { useTranslations } from "next-intl"
import { memo, useCallback, useEffect } from "react"

const GROUPS_GRID_BASE = "grid gap-x-3 px-5 py-2";

const GROUPS_GRID_LAYOUT = cn(
  GROUPS_GRID_BASE,
  "grid-cols-[1fr_1fr_6fr] lg:grid-cols-[1fr_1fr_8fr_2fr]"
)

const GROUPS_GRID_LAYOUT_ADMIN = cn(
  GROUPS_GRID_BASE,
  "grid-cols-[1fr_1fr_6fr] lg:grid-cols-[1fr_1fr_8fr_2fr_1fr]"
)

interface GroupsRelationsProps {
  className?: string,
  initialHasMore?: boolean,
  initialProducts?: ProductWithRelationsShort[],
  initialParishesId: string | null
  initialParishTitle: string
}

export const GroupsRelations = memo(({ className, initialHasMore, initialProducts, initialParishesId, initialParishTitle }: GroupsRelationsProps) => {
  const t = useTranslations('groups');
  const isAdmin = useHydratedIsAdmin();
  const { activeParishe } = useParishesStore()
  const storeActiveParisheTitle = activeParishe?.translations[0]?.title
  const [activeParishId, setActiveParishId] = useActiveParishId(initialParishesId);
  const { products, isLoading, error, clearProducts, hasMore, loadMore, addProduct, removeProduct } = useInfiniteProducts<ProductWithRelationsShort>({
    parishId: activeParishId, initialProducts, initialHasMore, fetchFnAction: fetchProductsShort
  });
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })
  const { productDetails } = useViewProduct()
  const { confirmDeleteProduct } = useDeleteProduct()
  const activeParishTitle = storeActiveParisheTitle ? storeActiveParisheTitle : initialParishTitle;

  const openProductModal = useCallback((product: ProductWithRelationsShort) => {
    productDetails(product)
  }, [productDetails])

  const handlerDeleteProduct = useCallback((product: ProductWithRelationsShort) => {
    confirmDeleteProduct(product, () => { removeProduct(product.id) });
  }, [confirmDeleteProduct, removeProduct])

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  if (!activeParishId) return (
    <ProductsStateMessage className="text-muted-foreground">
      {t("groups-relations.parishes-not-selected")}
    </ProductsStateMessage>
  )

  if (error) return (
    <ProductsStateMessage className="text-destructive">
      {t("groups-relations.parishes-error")}
    </ProductsStateMessage>
  )

  if (isLoading && products.length === 0) return (
    <ProductsStateMessage className="flex flex-col h-full min-h-0">
      <LoaderSpin className="h-16 w-16" />
    </ProductsStateMessage>
  )

  const GROUPS_LAYOUT = isAdmin ? GROUPS_GRID_LAYOUT_ADMIN : GROUPS_GRID_LAYOUT

  return (
    <div className={cn("flex flex-col h-full min-h-0", className)}>
      <ProductsShortBody
        title={activeParishTitle}
        actions={isAdmin ? <ProductCreateButton parishId={activeParishId} onSuccessAction={addProduct} /> : null}
        onCloseActions={() => { setActiveParishId(""); clearProducts(); }}
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
              <span className="text-sm text-muted-foreground font-semibold">{t("groups-relations.products.not-found")}</span>
            </div>
          )}
        </div>
      </ProductsShortBody>
    </div>
  )
})

GroupsRelations.displayName = "GroupsRelations"
