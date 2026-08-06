"use client"

import dynamic from "next/dynamic";
import { SpecificationInputSkeleton } from "./specification-input-skeleton";

export const SpecificationInputDynamic = dynamic(
  () => import("./specification-input").then(m => ({ default: m.SpecificationInput })),
  {
    loading: () => <SpecificationInputSkeleton />,
    ssr: false
  }
);