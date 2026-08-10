import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui/skeleton";

export const SidebarNavSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center gap-y-6", className)}>
      {
        Array.from({ length: 5 }).map((_, index) => (
          <div
            key={`sidebar-nav-skeleton-${index}`}
            className="flex gap-x-3"
          >
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="w-24 h-6" />
          </div>
        ))
      }
    </div>
  );
}

SidebarNavSkeleton.displayName = "SidebarNavSkeleton"
