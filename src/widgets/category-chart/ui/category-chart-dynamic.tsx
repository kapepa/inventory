"use client"

import dynamic from "next/dynamic";
import { CategoryChartSkeleton } from "./category-chart-skeleton";

export const CategoryChartDynamic = dynamic(() => import("./category-chart").then(mod => mod.CategoryChart), {
  loading: () => (
    <CategoryChartSkeleton className="w-full aspect-2/1 min-h-75 m-auto" />
  ),
  ssr: false
});