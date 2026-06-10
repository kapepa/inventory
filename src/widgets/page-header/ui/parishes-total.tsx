"use client"

import { useParishesStore } from "@/entities";

interface ParishesTotalProps {
  className?: string;
  fallbackCount?: number;
}

export const ParishesTotal = ({ fallbackCount, className }: ParishesTotalProps) => {
  const total = useParishesStore((state) => state.total);

  const displayTotal = total !== undefined && total >= 0 ? total : fallbackCount;

  if (displayTotal === undefined) return null;

  return (
    <>
      <span>/</span>
      <span className={className}>{displayTotal}</span>
    </>
  );
};

ParishesTotal.displayName = "ParishesTotal";