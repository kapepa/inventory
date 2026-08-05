import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui";
import { memo } from "react";

export const ParishShortCardSkeleton = memo(({ className }: { className?: string }) => {
  return (
    <div>
      <Skeleton className={cn(className, "h-24 w-full")} />
    </div>
  )
})

ParishShortCardSkeleton.displayName = "ParishShortCardSkeleton"