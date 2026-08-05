import { cn } from "@/shared/lib/utils"
import { Skeleton } from "@/shared/ui"

export const AddProductButtonSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("size-8 rounded-full", className)} />
  )
}

AddProductButtonSkeleton.displayName = "AddProductButtonSkeleton"