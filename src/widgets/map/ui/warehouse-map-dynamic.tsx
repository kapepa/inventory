"use client";

import { LoaderSpin } from "@/shared";
import dynamic from "next/dynamic";

export const WarehouseMapDynamic = dynamic(
  () => import("./warehouse-map").then(mod => mod.WarehouseMap),
  {
    loading: () => (
      <div className="h-full flex items-center justify-center">
        <LoaderSpin className="size-10" />
      </div>
    ),
    ssr: false,
  }
);