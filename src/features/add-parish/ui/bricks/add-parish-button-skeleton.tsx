import { cn } from "@/shared/lib"
import { Skeleton } from "@/shared/ui"

export const AddParishButtonSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("size-10 rounded-full", className)} />
  )
}

AddParishButtonSkeleton.displayName = "AddParishButtonSkeleton"