import { cn } from "@/shared/lib";
import { Skeleton } from "@/shared/ui";
import dynamic from "next/dynamic";

export const AddProductButtonDynamic = dynamic(
  () => import("./add-product-button-content").then(mod => mod.AddProductButtonContent),
  {
    loading: () => <AddProductButtonSkeleton />,
    ssr: false,
  }
);

export const AddProductButtonSkeleton = ({ className }: { className?: string }) => {
  return (
    <Skeleton className={cn("size-8 rounded-full", className)} />
  )
}

AddProductButtonSkeleton.displayName = "AddProductButtonSkeleton"