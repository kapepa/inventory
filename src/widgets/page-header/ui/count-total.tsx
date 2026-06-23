"use client"

import { memo } from "react";
import { StoreType, useTotalByStore } from "../lib";

interface CountTotalProps {
  className?: string;
  fallbackCount?: number;
  storeType?: StoreType
}

export const CountTotal = memo(({ fallbackCount, className, storeType }: CountTotalProps) => {
  const total = useTotalByStore(storeType);
  const displayTotal = total > 0 ? total : (fallbackCount ?? 0)

  if (displayTotal === undefined) return null;

  return (
    <>
      <span className="hidden lg:inline">/</span>
      <span className={className}>{displayTotal}</span>
    </>
  );
});

CountTotal.displayName = "CountTotal";