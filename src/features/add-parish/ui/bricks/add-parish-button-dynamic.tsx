"use client"

import { cn } from "@/shared/lib";
import { Skeleton } from "@/shared/ui";
import dynamic from "next/dynamic";

export const AddParishButtonDynamic = dynamic(
  () => import("./add-parish-button-content").then(mod => mod.AddParishButtonContent),
  {
    loading: () => <AddParishButtonSkeleton />,
    ssr: false,
  }
);

export const AddParishButtonSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("size-10 rounded-full", className)} />
  )
}

AddParishButtonSkeleton.displayName = "AddParishButtonSkeleton"