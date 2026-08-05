"use client"

import { memo } from "react";
import { StoreType } from "../../lib/types/types";
import { useTotalByStore } from "../../lib/hooks/use-store-selector";

interface CountTotalProps {
  className?: string;
  fallbackCount?: number;
  storeType?: StoreType
}

export const CountTotal = memo(({ fallbackCount, className, storeType }: CountTotalProps) => {
  const total = useTotalByStore(storeType);
  const displayTotal = total === 0 ? (fallbackCount ?? 0) : total

  if (displayTotal === undefined) return null;

  return (
    <>
      <span className="hidden lg:inline">/</span>
      <span className={className}>{fallbackCount}</span>
    </>
  );
});

CountTotal.displayName = "CountTotal";