import { cn, Skeleton } from "@/shared";
import { memo } from "react";

export const ParishShortCardSkeleton = memo(({ className }: { className?: string }) => {
  <Skeleton className={cn(className, "h-24 w-full")} />
})

ParishShortCardSkeleton.displayName = "ParishShortCardSkeleton"