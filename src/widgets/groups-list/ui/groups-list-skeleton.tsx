import { ParishShortCardSkeleton } from "@/entities/parish/ui/parish-short/parish-short-card-skeleton";
import { ParishShortHeader } from "@/entities/parish/ui/parish-short/parish-short-header";
import { cn } from "@/shared/lib/utils";

const CARD_CLASS = "grid grid-cols-[1fr_1fr_2fr] items-center gap-4";

export const GroupsListSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col h-full min-h-0 gap-y-3", className)}>
      <ParishShortHeader
        className={cn(CARD_CLASS)}
      />
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="flex flex-col gap-y-3 pb-6 md:pb-16">
          {
            Array.from({ length: 3 }).map((_, index) => (
              <ParishShortCardSkeleton
                key={`groups-list-skeleton-${index}`}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

GroupsListSkeleton.displayName = 'GroupsListSkeleton';
