"use client"

import { ProductsBody, ProductsWithRelations, useInfiniteProducts } from "@/entities/products"
import { Button, QUERY_PARAMS_KEYS, useMounted, useQueryParam } from "@/shared"
import { LoaderSpin } from "@/shared/ui/loader-spin"
import { useTranslations } from "next-intl"

interface GroupsRelationsProps {
  initialHasMore?: boolean,
  initialProducts?: ProductsWithRelations[]
}

export const GroupsRelations = ({ initialHasMore, initialProducts }: GroupsRelationsProps) => {
  const t = useTranslations('groups');
  const mounted = useMounted()
  const [activeParishId] = useQueryParam(QUERY_PARAMS_KEYS.ACTIVE_PARISH);
  const { products, isLoading, error, hasMore, loadMore } = useInfiniteProducts({ parishId: activeParishId, initialProducts, initialHasMore });

  if (!mounted || !activeParishId) {
    return (
      <div className="flex items-center justify-center py-8 text-muted-foreground">
        {t("groups-relations.parishes-not-selected")}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8 text-destructive">
        {error}
      </div>
    )
  }

  if (isLoading && products.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoaderSpin className="h-16 w-16" />
      </div>
    )
  }

  return (
    <ProductsBody
      title="Some Test text"
      actions={<Button>Add</Button>}
      onCloseActions={() => { }}
    >
      sdasd
    </ProductsBody>
  )
}

GroupsRelations.displayName = "GroupsRelations"
