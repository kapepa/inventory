import { CategoryCardSkeleton } from "@/entities/category/ui/category-card-skeleton";
import { CategoryHeaderSkeleton } from "@/entities/category/ui/category-header-skeleton";
import { cn } from "@/shared/lib/utils";

const CARD_CLASS = "grid grid-cols-[1fr_1fr] lg:grid-cols-[8fr_1fr_2fr_1fr] items-center gap-4";

export const CategoriesListSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex-1 min-h-0 flex flex-col", className)}>
      <CategoryHeaderSkeleton className={cn("", CARD_CLASS)} />
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className={cn("flex flex-col max-w-lg lg:max-w-full h-full min-h-0 gap-y-3 m-auto pb-6 md:pb-16", className)}>
          {
            Array.from({ length: 3 }).map((_, index) => (
              <CategoryCardSkeleton
                key={`categories-list-skeleton-${index}`}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

CategoriesListSkeleton.displayName = "CategoriesListSkeleton"