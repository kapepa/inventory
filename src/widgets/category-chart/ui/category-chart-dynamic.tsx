"use client"

import { LoaderSpin } from "@/shared";
import dynamic from "next/dynamic";

export const CategoryChartDynamic = dynamic(() => import("./category-chart").then(mod => mod.CategoryChart), {
  loading: () => (
    <div className="h-full flex items-center justify-center">
      <LoaderSpin className="size-10" />
    </div>
  ),
  ssr: false
});