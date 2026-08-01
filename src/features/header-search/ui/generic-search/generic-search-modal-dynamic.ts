"use client"

import dynamic from "next/dynamic";

export const GenericSearchModalDynamic = dynamic(
  () => import("./generic-search-modal").then(m => m.GenericSearchModal),
  { ssr: false }
);