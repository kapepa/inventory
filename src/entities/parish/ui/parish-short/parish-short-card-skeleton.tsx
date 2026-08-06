import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui";

export const ParishShortCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("h-24 w-full", className)} />
  )
}

ParishShortCardSkeleton.displayName = "ParishShortCardSkeleton"