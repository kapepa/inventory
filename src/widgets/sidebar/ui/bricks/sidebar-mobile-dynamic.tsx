"use client"

import dynamic from "next/dynamic";

export const SidebarMobileDynamic = dynamic(
  () => import("./sidebar-body").then(mod => mod.SidebarBody),
  {
    ssr: false,
  }
);