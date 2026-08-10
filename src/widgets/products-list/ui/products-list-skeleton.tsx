import { cn } from "@/shared/lib/utils"
import { ProductsWideCardSkeleton } from "@/entities/product/ui/products-wide/products-wide-card-skeletob"

export const ProductsListSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className="flex-1 min-h-0 flex flex-col w-full">
      <div className="flex-1 min-h-0 w-full mx-auto max-w-lg lg:max-w-full overflow-hidden">
        <div className={cn("flex flex-col gap-3 pb-6 md:pb-16", className)}>
          {
            Array.from({ length: 4 }).map((_, index) => (
              <ProductsWideCardSkeleton
                key={`products-list-skeleton${index}`}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

ProductsListSkeleton.displayName = "ProductsListSkeleton"