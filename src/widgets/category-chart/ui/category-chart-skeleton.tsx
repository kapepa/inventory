import { cn } from "@/shared/lib/utils";
import { LoaderSpin, Skeleton } from "@/shared/ui";

export const CategoryChartSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("h-full flex items-center justify-center", className)}>
      <LoaderSpin className="size-10" />
    </Skeleton>
  );
}

CategoryChartSkeleton.displayName = "CategoryChartSkeleton";