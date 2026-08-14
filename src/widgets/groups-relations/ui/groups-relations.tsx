"use client"

import { useCallback, useEffect, useMemo } from "react"
import { fetchProductsShort } from "@/entities/product/api"
import { useInfiniteProducts } from "@/entities/product/model/hooks/use-infinite-products"
import { ProductWithRelationsShort } from "@/entities/product/model/types"
import { AddProductButton } from "@/features/add-product/ui/add-product-button"
import { useViewProduct } from "@/features/view-product-details/model/hooks/use-view-product"
import { cn } from "@/shared/lib/utils";
import { useIntersectionObserver } from "@/shared/lib/hooks/use-intersection-observer"
import { LoaderSpin } from "@/shared/ui/loader-spin"
import { getRelationshLayout } from "./relations-grid-layout-styles"
import { ProductsShortBody } from "@/entities/product/ui/products-short/products-short-body"
import { ProductShortCard } from "@/entities/product/ui/products-short/product-short-card"
import { DeleteProductProvider, useDeleteProductContext } from "@/shared/lib/providers/delete-product-context"
import { ProductShortCardSkeleton } from "@/entities/product/ui/products-short/product-short-card-skeleton"
import { StateMessage } from "@/shared/ui/state-message"
import { useRouter } from "@/shared/lib/i18n/routing"
import { ROUTES } from "@/shared/constants/routes"
import { GroupsRelationsLabels } from "../model/types"

interface GroupsRelationsProps {
  labels: GroupsRelationsLabels
  isAdmin: boolean,
  className?: string,
  initialHasMore?: boolean,
  initialProducts?: ProductWithRelationsShort[],
  initialParishesId: string | null
  initialParishTitle: string
}

export const GroupsRelationsInner = ({ labels, isAdmin, className, initialHasMore, initialProducts, initialParishesId, initialParishTitle }: GroupsRelationsProps) => {
  const router = useRouter()
  const { products, isLoading, error, hasMore, loadMore, addProduct, removeProduct } = useInfiniteProducts<ProductWithRelationsShort>({
    parishId: initialParishesId, initialProducts, initialHasMore, fetchFnAction: fetchProductsShort
  });
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })
  const { confirmProductDelete } = useDeleteProductContext();
  const { productDetails } = useViewProduct()

  const GROUPS_LAYOUT = useMemo(
    () => getRelationshLayout(isAdmin),
    [isAdmin]
  )

  const openProductModal = useCallback((product: ProductWithRelationsShort) => {
    productDetails(product)
  }, [productDetails])

  const handlerDeleteProduct = useCallback((product: ProductWithRelationsShort) => {
    confirmProductDelete(product, () => { removeProduct(product.id) });
  }, [removeProduct])

  const handleClose = useCallback(() => {
    router.push(ROUTES.GROUPS)
  }, [router])

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  if (error && !isLoading && !error.includes("cancel")) return (
    <StateMessage variant="destructive">
      {labels.parishesError}
    </StateMessage>
  )

  if (isLoading && products.length === 0) return (
    <div className="flex flex-col h-full min-h-0 w-full justify-center items-center">
      <LoaderSpin className="h-16 w-16" />
    </div>
  )

  return (
    <div className={cn("flex flex-col h-full min-h-0", className)}>
      <ProductsShortBody
        title={initialParishTitle}
        actions={isAdmin && <AddProductButton parishId={initialParishesId} onSuccessAction={addProduct} />}
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
              {isLoading && <ProductShortCardSkeleton />}
            </div>
          )}
          {(!hasMore && !products.length) && (
            <div className="w-full h-16 flex items-center justify-center">
              <span className="text-sm text-muted-foreground font-semibold">{labels.productsNotFound}</span>
            </div>
          )}
        </div>
      </ProductsShortBody>
    </div>
  )
}

GroupsRelationsInner.displayName = "GroupsRelationsInner"

export const GroupsRelations = (props: GroupsRelationsProps) => {
  return (
    <DeleteProductProvider>
      <GroupsRelationsInner {...props} />
    </DeleteProductProvider>
  )
}

GroupsRelations.displayName = "GroupsRelations"