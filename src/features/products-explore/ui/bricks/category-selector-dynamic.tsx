"use client"

import dynamic from "next/dynamic";
import { CategorySelectorSkeleton } from "./category-selector-skeleton";

export const CategorySelectorDynamic = dynamic(
  () => import("./category-selector").then(m => ({ default: m.CategorySelector })),
  {
    loading: () => <CategorySelectorSkeleton />,
    ssr: false
  }
);