"use client";


import { OnlineUsersCountSkeleton } from "@/shared/ui/online-users-count-skeleton";
import dynamic from "next/dynamic";

export const WebSocketProviderDynamic = dynamic(
  () => import("./websocket-provider").then(mod => mod.WebSocketProvider),
  {
    loading: () => <OnlineUsersCountSkeleton valueZero={true} />,
    ssr: false,
  }
);
