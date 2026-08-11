"use client"

import { useMediaQuery } from "@/shared/lib/hooks/use-media-query";
import { SidebarDesktopDynamic } from "./sidebar-desktop-dynamic";
import { SidebarMobileDynamic } from "./sidebar-mobile-dynamic";

export const SidebarSwitch = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return isDesktop === undefined || isDesktop ? <SidebarDesktopDynamic /> : <SidebarMobileDynamic />
}