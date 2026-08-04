"use client"

import dynamic from "next/dynamic";
import { DateCellSkeleton } from "../skeleton/date-cell-skeleton";

export const DateCellDynamic = dynamic(
  () => import("../cells/date-cell").then(m => m.DateCell),
  {
    loading() {
      return <DateCellSkeleton />
    },
    ssr: false
  }
);