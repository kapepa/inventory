"use client";

import dynamic from "next/dynamic";

export const WarehouseMapDynamic = dynamic(
  () => import("./warehouse-map").then(mod => mod.WarehouseMap),
  {
    ssr: false,
    loading: () => <div className="w-full h-full bg-muted animate-pulse rounded-lg" />,
  }
);