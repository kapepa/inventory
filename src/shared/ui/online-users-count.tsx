"use client"

import { UsersRound } from "lucide-react";
import { memo } from "react";
import { Skeleton } from "./skeleton";
import { useOnlineUserstStore } from "@/features/websocket/model/online-users-store";

export const OnlineUsersCount = memo(
  () => {
    const onlineUsers = useOnlineUserstStore((state) => state.onlineUsers)
    return (
      <div className="flex items-center gap-x-3">
        <UsersRound strokeWidth={3} className="w-4 h-4 text-accent" />
        <span>{onlineUsers.length}</span>
      </div>
    )
  }
)

OnlineUsersCount.displayName = "OnlineUsersCount"

export const OnlineUsersCountSkeleton = memo(
  () => {
    return (
      <div className="flex items-center gap-x-3">
        <UsersRound strokeWidth={3} className="w-4 h-4 text-accent" />
        <Skeleton className="h-6 w-6" />
      </div>
    )
  }
)

OnlineUsersCountSkeleton.displayName = "OnlineUsersCountSkeleton"