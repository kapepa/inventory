"use client"

import { fetchUsers, useInfiniteUsers, UserCard, UserCardSkeleton, UserPublic } from "@/entities";
import { UsersStateMessage } from "@/entities";
import { cn, LoaderSpin, QUERY_PARAMS_KEYS, ScrollArea, useIntersectionObserver, useQueryParam } from "@/shared";
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
    <UsersStateMessage className="text-destructive">
      {t("errors.infinite-scroll-error")}
    </UsersStateMessage>
  )

  if (isLoading && users.length === 0 && !initialUsers.length) return (
    <UsersStateMessage className="flex flex-col h-full min-h-0">
      <LoaderSpin className="h-16 w-16" />
    </UsersStateMessage>
  )

  return (
    <div className="flex-1 min-h-0 flex flex-col w-full">
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