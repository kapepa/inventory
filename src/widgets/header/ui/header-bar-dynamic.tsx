"use client"

import dynamic from "next/dynamic";

export const HeaderBarDynamic = dynamic(
  () => import("./header-bar").then((mod) => mod.HeaderBar),
  {
    ssr: false,
    loading: () => <div className="hidden md:flex flex-col justify-center h-full" />,
  }
);