import { cn } from "@/shared/lib/utils"
import { Skeleton } from "@/shared/ui"

export const AddCategoryButtonSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("size-10 rounded-full", className)} />
  )
}

AddCategoryButtonSkeleton.displayName = "AddCategoryButtonSkeleton"