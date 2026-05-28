import { memo } from "react";
import { Skeleton, cn } from "@/shared";;

interface ParishCardSkeletonProps {
  className?: string
}

export const ParishCardSkeleton = memo(({ className }: ParishCardSkeletonProps) => {
  return (
    <Skeleton className={cn(className, "h-24 w-full")} />
  );
});