"use client"

import { memo } from "react";

interface CountTotalProps {
  className?: string;
  total: number
}

export const CountTotal = memo(({ total, className }: CountTotalProps) => {
  return (
    <>
      <span className="hidden lg:inline">/</span>
      <span className={className}>{total}</span>
    </>
  );
});

CountTotal.displayName = "CountTotal";