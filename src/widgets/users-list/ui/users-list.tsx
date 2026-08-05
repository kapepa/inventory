"use client"

import { fetchUsers } from "@/entities/user/api";
import { useInfiniteUsers } from "@/entities/user/model/hooks";
import { UserPublic } from "@/entities/user/model/types";
import { UserCard, UserCardSkeleton } from "@/entities/user/ui/user-card/user-card";
import { QUERY_PARAMS_KEYS } from "@/shared/constants/query-params-keys";
import { cn } from "@/shared/lib/utils";
import { useIntersectionObserver } from "@/shared/lib/hooks";
import { useQueryParam } from "@/shared/lib/hooks/use-query-param";
import { ScrollArea, StateMessage } from "@/shared/ui";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

const CARD_CLASS = cn(
  "grid grid-cols-1",
  "md:grid-cols-2 lg:gap-6 auto-rows-auto",
)

interface UsersListProps {
  className?: string;
  initialUsers: UserPublic[];
  initialHasMore: boolean;
}

export const UsersList = ({ className, initialUsers, initialHasMore }: UsersListProps) => {
  const t = useTranslations('users-list');
  const [search] = useQueryParam(QUERY_PARAMS_KEYS.USERS_SEARCH)
  const { users, isLoading, error, hasMore, loadMore } = useInfiniteUsers({ search, initialUsers, initialHasMore, fetchFnAction: fetchUsers });
  const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: "100px" })

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      loadMore()
    }
  }, [isIntersecting, hasMore, isLoading, loadMore])

  if (error && !isLoading) return (
    <StateMessage variant="destructive" >
      {t("errors.infinite-scroll-error")}
    </StateMessage>
  )

  if (!hasMore && !users.length) return (
    <StateMessage>
      {t("users-empty")}
    </StateMessage>
  )

  return (
    <div className="flex-1 min-h-0 flex flex-col w-full max-w-2xl m-auto">
      <ScrollArea className="flex-1 min-h-0 w-full mx-auto max-w-lg lg:max-w-full">
        <div className={cn("flex flex-col gap-3 pb-6 md:pb-16", className)}>
          {
            users.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                className={cn("", CARD_CLASS)}
              />
            ))
          }
          {(hasMore || isLoading) && (
            <div ref={targetRef} className="w-full h-auto flex items-center justify-center min-h-14">
              {isLoading && <UserCardSkeleton className={cn("", CARD_CLASS)} />}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

UsersList.displayName = "UsersList";

export const UsersListSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className="flex-1 min-h-0 flex flex-col w-full max-w-2xl m-auto">
      <ScrollArea className="flex-1 min-h-0 w-full mx-auto max-w-lg lg:max-w-full">
        <div className={cn("flex flex-col gap-3 pb-6 md:pb-16", className)}>
          {
            Array.from({ length: 3 }).map((_, index) => (
              <UserCardSkeleton
                key={`users-list-skeleton-${index}`}
                className={cn("", CARD_CLASS)}
              />
            ))
          }
        </div>
      </ScrollArea>
    </div>
  );
};

UsersListSkeleton.displayName = "UsersListSkeleton";