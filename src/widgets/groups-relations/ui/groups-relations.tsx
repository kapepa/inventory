"use client"

import { ProductShortCard, ProductsShortAddNew, ProductsShortBody, ProductsShortStateMessage, ProductsWithRelations, useInfiniteProducts } from "@/entities/products"
import { Button, QUERY_PARAMS_KEYS, useQueryParam } from "@/shared"
import { LoaderSpin } from "@/shared/ui/loader-spin"
import { useTranslations } from "next-intl"

interface GroupsRelationsProps {
  className?: string,
  initialHasMore?: boolean,
  initialProducts?: ProductsWithRelations[],
  initialParishesId: string | null
}

export const GroupsRelations = ({ initialHasMore, initialProducts, initialParishesId }: GroupsRelationsProps) => {
  const t = useTranslations('groups');
  const [activeParishId, setActiveParishId] = useQueryParam(QUERY_PARAMS_KEYS.ACTIVE_PARISH);
  const { products, isLoading, error, clearProducts, hasMore, loadMore } = useInfiniteProducts({ parishId: activeParishId, initialProducts, initialHasMore });

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
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      actions={<ProductsShortAddNew />}
      onCloseActions={() => { setActiveParishId(""); clearProducts(); }}
    >
      {
        products.map((product) => (
          <ProductShortCard
            key={product.id}
            product={product}
          />
        ))
      }
    </ProductsShortBody>
  )
}

GroupsRelations.displayName = "GroupsRelations"
