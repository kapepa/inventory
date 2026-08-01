"use client"

import { cn } from "@/shared/lib";
import { Skeleton } from "@/shared/ui";
import dynamic from "next/dynamic";

export const AddCategoryButtonDynamic = dynamic(
  () => import("./add-category-button-content").then((mod) => mod.AddCategoryButtonContent), {
  loading: () => <AddCategoryButtonSkeleton />,
  ssr: false,
});

export const AddCategoryButtonSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("size-10 rounded-full", className)} />
  )
}

AddCategoryButtonSkeleton.displayName = "AddCategoryButtonSkeleton"