import { UserCardSkeleton } from "@/entities/user/ui/user-card/user-card-skeleton";
import { cn } from "@/shared/lib/utils";

export const UsersListSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className="flex-1 min-h-0 flex flex-col w-full max-w-2xl m-auto">
      <div className="flex-1 min-h-0 w-full mx-auto max-w-lg lg:max-w-full overflow-hidden">
        <div className={cn("flex flex-col gap-3 pb-6 md:pb-16", className)}>
          {
            Array.from({ length: 3 }).map((_, index) => (
              <UserCardSkeleton
                key={`users-list-skeleton-${index}`}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

UsersListSkeleton.displayName = "UsersListSkeleton";