import { cn } from "@/shared/lib/utils"
import { ScrollArea } from "@/shared/ui"
import { getProductsLayout } from "./products-grid-layout-styles"
import { ProductsWideCardSkeleton } from "@/entities/product/ui/products-wide"

export const ProductsListSkeleton = ({ className }: { className?: string }) => {
  const isAdmin = false
  const PRODUCTD_LAYOUT = getProductsLayout(isAdmin)

  return (
    <div className="flex-1 min-h-0 flex flex-col w-full">
      <ScrollArea className="flex-1 min-h-0 w-full mx-auto max-w-lg lg:max-w-full">
        <div className={cn("flex flex-col gap-3 pb-6 md:pb-16", className)}>
          {
            Array.from({ length: 4 }).map((_, index) => (
              <ProductsWideCardSkeleton
                key={`products-list-skeleton${index}`}
                isAdmin={isAdmin}
                className={PRODUCTD_LAYOUT}
              />
            ))
          }
        </div>
      </ScrollArea>
    </div>
  )
}

ProductsListSkeleton.displayName = "ProductsListSkeleton"