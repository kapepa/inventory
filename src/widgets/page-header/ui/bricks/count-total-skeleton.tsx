import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui";

export const CountTotalSkeleton = ({ className }: { className?: string }) => {
  return (
    <>
      <span className="hidden lg:inline">/</span>
      <Skeleton className={cn("h-7 w-3 md:h-9 md:w-8", className)} />
    </>
  );
};

CountTotalSkeleton.displayName = "CountTotalSkeleton";