"use client"

import dynamic from "next/dynamic";
import { TitleCellFallback } from "../cells/title-cell-fallback";
import { useMounted } from "@/shared/lib/hooks";
import { TitleCellProps } from "../../model/types/types";
import { cn } from "@/shared/lib";

const TitleCellLazy = dynamic(
  () => import("../cells/title-cell").then(m => m.TitleCell),
  { ssr: false }
);

export const TitleCellDynamic = ({ label, title, className }: TitleCellProps) => {
  const mounted = useMounted()

  return (
    <>
      <div className={cn(mounted ? "hidden" : "", "col-span-2 md:col-span-1")}>
        <TitleCellFallback label={label} title={title} className={className} />
      </div>

      <div className={cn(!mounted ? "invisible absolute" : "", "col-span-2 md:col-span-1")}>
        <TitleCellLazy label={label} title={title} className={className} />
      </div>
    </>
  );
};