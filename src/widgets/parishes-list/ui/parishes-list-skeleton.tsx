import { ParishWideHeaderSkeleton } from "@/entities/parish/ui/parish-wide/parish-wide-header"
import { getParishLayout } from "./parishes-list.styles"
import { ParishWideCardSkeleton } from "@/entities/parish/ui/parish-wide/parish-wide-card-skeleton"
import { cn } from "@/shared/lib/utils"

export const ParishesListSkeleton = ({ isAdmin = false, className }: { isAdmin?: boolean, className?: string }) => {
  const PARISH_LAYOUT = getParishLayout(isAdmin)

  return (
    <div className={cn("w-full min-h-0 flex flex-col", className)}>
      <ParishWideHeaderSkeleton
        isAdmin={isAdmin}
        className={cn(PARISH_LAYOUT, "hidden md:grid shrink-0")}
      />
      <div className="flex-1 min-h-0 w-full mx-auto max-w-lg lg:max-w-full overflow-hidden">
        <div className="flex flex-col gap-3 mx-auto pb-6 md:pb-16 w-full">
          {Array.from({ length: 4 }).map((_, index) => (
            <ParishWideCardSkeleton
              key={`parishes-list-skeleton-${index}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

ParishesListSkeleton.displayName = "ParishesListSkeleton"