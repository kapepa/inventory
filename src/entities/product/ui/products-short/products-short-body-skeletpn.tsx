import { cn } from "@/shared/lib/utils"
import { Skeleton, XButtonCloseSkeleton } from "@/shared/ui"
import { ReactNode } from "react"

export const ProductsShortBodySkeleton = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <div
      className={cn("border rounded-md bg-card flex flex-col min-h-0 relative", className)}
    >
      <XButtonCloseSkeleton
        className="hidden lg:flex absolute top-0 right-0 translate-x-1/3 xl:translate-x-1/2 -translate-y-1/2"
      />
      <div className="px-6 pb-3 pt-5 flex flex-col min-w-0 shrink-0">
        <div className="pb-4 min-w-0">
          <Skeleton className="" />
        </div>
      </div>
      <div className="h-full flex-1 min-h-0 overflow-hidden">
        {children}
      </div>
    </div>
  )
}

ProductsShortBodySkeleton.displayName = "ProductsShortBodySkeleton"