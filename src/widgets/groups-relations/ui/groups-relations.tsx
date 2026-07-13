"use client"

import { useParishesStore, fetchProductsShort, ProductShortCard, ProductShortCardSkeleton, ProductsShortBody, ProductsStateMessage, ProductWithRelationsShort, useInfiniteProducts } from "@/entities"
import { ProductCreateButton, useDeleteProduct, useViewProduct } from "@/features"
import { cn, useActiveParishId, useIntersectionObserver, LoaderSpin } from "@/shared"
import { useTranslations } from "next-intl"
import { memo, useCallback, useEffect } from "react"

const CARD_CLASS = "grid gap-x-3 px-5 py-2 grid-cols-[1fr_1fr_6fr] lg:grid-cols-[1fr_1fr_8fr_2fr_1fr]"

interface GroupsRelationsProps {
  className?: string,
  initialHasMore?: boolean,
  initialProducts?: ProductWithRelationsShort[],
  initialParishesId: string | null
  initialParishTitle: string
}

export const GroupsRelations = memo(({ className, initialHasMore, initialProducts, initialParishesId, initialParishTitle }: GroupsRelationsProps) => {
  const t = useTranslations('groups');
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

  return (
    <div className={cn("flex flex-col h-full min-h-0", className)}>
      <ProductsShortBody
        title={activeParishTitle}
        actions={<ProductCreateButton parishId={activeParishId} onSuccessAction={addProduct} />}
        onCloseActions={() => { setActiveParishId(""); clearProducts(); }}
      >
        <div className="flex flex-col">
          {
            products.map((product) => (
              <ProductShortCard
                key={product.id}
                product={product}
                className={CARD_CLASS}
                openProductModal={openProductModal}
                onDeleteProduct={handlerDeleteProduct}
              />
            ))
          }
          {(hasMore || isLoading) && (
            <div ref={targetRef} className="w-full h-16 flex items-center justify-center">
              {isLoading && <ProductShortCardSkeleton className={CARD_CLASS} />}
            </div>
          )}
        </div>
      </ProductsShortBody>
    </div>
  )
})

GroupsRelations.displayName = "GroupsRelations"
