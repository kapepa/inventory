import { cn, Skeleton } from "@/shared";
import { memo } from "react";

export const ParishShortCardSkeleton = memo(({ className }: { className?: string }) => {
  return (
    <div>
      <Skeleton className={cn(className, "h-24 w-full")} />
    </div>
  )
})

ParishShortCardSkeleton.displayName = "ParishShortCardSkeleton"