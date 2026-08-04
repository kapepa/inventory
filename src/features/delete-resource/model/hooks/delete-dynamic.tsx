"use client"

import dynamic from "next/dynamic";

export const DeleteParishDynamic = dynamic(
  () => import("./use-delete-parish").then(m => ({
    default: m.DeleteParishWrapper
  })),
  { ssr: false }
);