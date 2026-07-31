"use client"

import dynamic from "next/dynamic";

export const SidebarDesktopDynamic = dynamic(
  () => import("./sidebar-body").then(mod => mod.SidebarBody),
  {
    ssr: true,
  }
);