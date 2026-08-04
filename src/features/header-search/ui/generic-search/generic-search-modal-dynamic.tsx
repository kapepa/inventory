"use client"

import dynamic from "next/dynamic";
import { GenericSearchModalSkeleton } from "./generic-search-modal-skeleton";

export const GenericSearchModalDynamic = dynamic(
  () => import("./generic-search-modal").then(m => m.GenericSearchModal),
  {
    loading() {
      return <GenericSearchModalSkeleton />
    },
    ssr: false
  }
);