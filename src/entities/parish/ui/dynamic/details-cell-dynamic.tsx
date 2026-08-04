"use client"

import { useMounted } from "@/shared/lib/hooks";
import dynamic from "next/dynamic";
import { DetailsCellFallback } from "../cells/details-cell-fallback";
import { DetailsCellProps } from "../../model/types/types";

export const DetailsCelllLazy = dynamic(
  () => import("../cells/details-cell").then(m => m.DetailsCell),
  {
    ssr: false
  }
);

export const DetailsCellDynamic = ({ label, title, className, description }: DetailsCellProps) => {
  const mounted = useMounted()

  return (
    <>
      <div className={mounted ? "hidden" : ""}>
        <DetailsCellFallback label={label} title={title} description={description} className={className} />
      </div>
      <div className={!mounted ? "invisible absolute" : ""}>
        <DetailsCelllLazy label={label} title={title} description={description} className={className} />
      </div>
    </>
  );
};