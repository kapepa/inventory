import { getRelationshLayout } from "./relations-grid-layout-styles"
import { cn } from "@/shared/lib/utils"
import { ProductsShortBodySkeleton } from "@/entities/product/ui/products-short/products-short-body"
import { ProductShortCardSkeleton } from "@/entities/product/ui/products-short/product-short-card"

export const GroupsRelationsSkeleton = ({ className }: { className?: string }) => {
  const isAdmin = false
  const GROUPS_LAYOUT = getRelationshLayout(isAdmin)

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