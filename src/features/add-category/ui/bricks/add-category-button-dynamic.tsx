"use client"

import dynamic from "next/dynamic";
import { AddCategoryButtonSkeleton } from "./add-category-button-skeleton";

export const AddCategoryButtonDynamic = dynamic(
  () => import("./add-category-button-content").then((mod) => mod.AddCategoryButtonContent), {
  loading: () => <AddCategoryButtonSkeleton />,
  ssr: false,
});