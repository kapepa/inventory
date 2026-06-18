"use client"

import { useParishesStore } from "@/entities";
import { memo } from "react";

interface CountTotalProps {
  className?: string;
  fallbackCount?: number;
}

export const CountTotal = memo(({ fallbackCount, className }: CountTotalProps) => {
  const total = useParishesStore((state) => state.total);
  const displayTotal = total > 0 ? total : (fallbackCount ?? 0)

  if (displayTotal === undefined) return null;

  return (
    <>
      <span>/</span>
      <span className={className}>{displayTotal}</span>
    </>
  );
});

CountTotal.displayName = "CountTotal";