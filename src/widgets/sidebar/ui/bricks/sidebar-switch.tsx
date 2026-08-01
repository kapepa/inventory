"use client"

import { useMediaQuery } from "@/shared/lib/hooks";
import { SidebarMobileDynamic } from "./sidebar-mobile-dynamic";
import { SidebarDesktopDynamic } from "./sidebar-desktop-dynamic";

export const SidebarSwitch = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return isDesktop === undefined || isDesktop ? <SidebarDesktopDynamic /> : <SidebarMobileDynamic />
}