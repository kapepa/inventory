import { cn } from "@/shared/lib/utils"
import { ProductsShortBodySkeleton } from "@/entities/product/ui/products-short/products-short-body-skeletpn"
import { ProductShortCardSkeleton } from "@/entities/product/ui/products-short/product-short-card-skeleton"

export const GroupsRelationsSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col h-full min-h-0", className)}>
      <ProductsShortBodySkeleton>
        <div className="flex flex-col">
          {
            Array.from({ length: 3 }).map((_, index) => (
              <ProductShortCardSkeleton
                key={`groups-relations-skeleton-${index}`}
              />
            ))
          }
        </div>
      </ProductsShortBodySkeleton>
    </div>
  )
}

GroupsRelationsSkeleton.displayName = "GroupsRelationsSkeleton"