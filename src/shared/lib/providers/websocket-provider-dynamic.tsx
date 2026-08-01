"use client";

import dynamic from "next/dynamic";
import { ReactNode } from "react";

const WebSocketProviderComponent = dynamic(
  () => import("./websocket-provider").then(mod => mod.WebSocketProvider),
  {
    ssr: false,
  }
);

export const WebSocketProviderDynamic = ({ children }: { children: ReactNode }) => {
  return <WebSocketProviderComponent>{children}</WebSocketProviderComponent>;
};