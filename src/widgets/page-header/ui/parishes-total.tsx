"use client"

import { useParishesStore } from "@/entities";

interface ParishesTotalProps {
  className?: string;
  fallbackCount?: number;
}

export const ParishesTotal = ({ fallbackCount, className }: ParishesTotalProps) => {
  const total = useParishesStore((state) => state.total);

  const displayTotal = total > 0 ? total : (fallbackCount ?? 0)

  if (displayTotal === undefined) return null;

  return (
    <>
      <span>/</span>
      <span className={className}>{displayTotal}</span>
    </>
  );
};

ParishesTotal.displayName = "ParishesTotal";