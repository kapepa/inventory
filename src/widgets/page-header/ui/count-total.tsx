"use client"

import { memo } from "react";
import { StoreType, useTotalByStore } from "../lib";
import { cn, Skeleton, useMounted } from "@/shared";

interface CountTotalProps {
  className?: string;
  fallbackCount?: number;
  storeType?: StoreType
}

export const CountTotal = memo(({ fallbackCount, className, storeType }: CountTotalProps) => {
  const total = useTotalByStore(storeType);
  const mounted = useMounted();
  const displayTotal = mounted && total !== null ? total : (fallbackCount ?? 0)

  if (displayTotal === undefined) return null;

  return (
    <>
      <span className="hidden lg:inline">/</span>
      <span className={className}>{displayTotal}</span>
    </>
  );
});

CountTotal.displayName = "CountTotal";

export const CountTotalSkeleton = ({ className }: { className?: string }) => {
  return (
    <>
      <span className="hidden lg:inline">/</span>
      <Skeleton className={cn("h-9 w-8", className)} />
    </>
  );
};

CountTotalSkeleton.displayName = "CountTotalSkeleton";