"use client"

import dynamic from "next/dynamic";
import { Skeleton } from "../skeleton";

export const LanguageSwitcherDynamic = dynamic(
  () => import("./language-switcher").then(mod => mod.LanguageSwitcher),
  {
    loading: () => <Skeleton className="w-28 h-7" />,
    ssr: false,
  }
);