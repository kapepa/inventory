import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui/skeleton";

export const CategoryHeaderSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn(
      "px-6 py-3 text-xs font-bold text-muted-foreground uppercase tracking-widest",
      className,
      "hidden lg:grid"
    )}>
      <div><Skeleton className="h-5 w-40" /></div>
      <div><Skeleton className="h-5 w-24" /></div>
      <div><Skeleton className="h-5 w-20 m-auto" /></div>
      <div><Skeleton className="h-5 w-20 m-auto" /></div>
    </div>
  );
}

CategoryHeaderSkeleton.displayName = 'CategoryHeaderSkeleton';