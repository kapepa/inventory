"use client"

import { useParishesStore } from "@/entities/parish"
import { ProductShortCard, ProductShortCardSkeleton, ProductsShortBody, ProductsShortStateMessage, ProductWithRelations, useInfiniteProducts } from "@/entities/products"
import { ProductCreateButton, useDeleteProduct, useViewProduct } from "@/features"
import { QUERY_PARAMS_KEYS, useIntersectionObserver, useQueryParam } from "@/shared"
import { LoaderSpin } from "@/shared/ui/loader-spin"
import { useTranslations } from "next-intl"
import { useCallback, useEffect } from "react"

const CARD_CLASS = "grid gap-x-3 px-4 py-2 grid-cols-[1fr_1fr_8fr_2fr_1fr]"

interface GroupsRelationsProps {
  className?: string,
  initialHasMore?: boolean,
  initialProducts?: ProductWithRelations[],
  initialParishesId: string | null
  initialParishTitle: string
}

export const GroupsRelations = ({ initialHasMore, initialProducts, initialParishesId, initialParishTitle }: GroupsRelationsProps) => {
  const t = useTranslations('groups');
  const { parishes } = useParishesStore();
  const [activeParishId, setActiveParishId] = useQueryParam(QUERY_PARAMS_KEYS.ACTIVE_PARISH);
  const { products, isLoading, error, clearProducts, hasMore, loadMore, addProduct, removeProduct } = useInfiniteProducts({ parishId: activeParishId, initialProducts, initialHasMore });
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })
  const { productDetails } = useViewProduct()
  const { confirmDeleteProduct } = useDeleteProduct()

  const getActiveParishId = activeParishId || initialParishesId
  const activeParish = parishes.find((p) => p.id === getActiveParishId);
  const activeParishTitle = activeParish?.translations[0]?.title || initialParishTitle;

  const openProductModal = useCallback((product: ProductWithRelations) => {
    productDetails(product)
  }, [productDetails])

  const handlerDeleteProduct = useCallback((product: ProductWithRelations) => {
    confirmDeleteProduct(product, () => { removeProduct(product.id) });
  }, [confirmDeleteProduct, removeProduct])

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  if (!initialParishesId && !activeParishId) return (
    <ProductsShortStateMessage className="text-muted-foreground">
      {t("groups-relations.parishes-not-selected")}
    </ProductsShortStateMessage>
  )

  if (error) return (
    <ProductsShortStateMessage className="text-destructive">
      {t("groups-relations.parishes-error")}
    </ProductsShortStateMessage>
  )

  if (isLoading && products.length === 0) return (
    <ProductsShortStateMessage>
      <LoaderSpin className="h-16 w-16" />
    </ProductsShortStateMessage>
  )

  return (
    <ProductsShortBody
      title={activeParishTitle}
      actions={<ProductCreateButton parishId={getActiveParishId} onSuccessAction={addProduct} />}
      onCloseActions={() => { setActiveParishId(""); clearProducts(); }}
    >
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
        <div ref={targetRef} >
          {isLoading && <ProductShortCardSkeleton className={CARD_CLASS} />}
        </div>
      )}
    </ProductsShortBody>
  )
}

GroupsRelations.displayName = "GroupsRelations"
