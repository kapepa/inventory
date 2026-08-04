"use client"

import { cn } from "@/shared/lib";
import { MobileCellLabel } from "@/shared/ui";
import { TitleCellProps } from "../../model/types/types";

export const TitleCellFallback = ({ label, title, className }: TitleCellProps) => {
  return (
    <div className={cn("", className)}>
      {label && <MobileCellLabel className="block md:hidden">{label}</MobileCellLabel>}
      <span className="block text-center md:text-left truncate font-medium text-xl text-chart-2 underline decoration-1 underline-offset-5 w-full">
        {title}
      </span>
    </div>
  );
};