"use client"

import dynamic from "next/dynamic";
import { AddProductButtonSkeleton } from "./add-product-button-skeleton";

export const AddProductButtonDynamic = dynamic(
  () => import("./add-product-button-content").then(mod => mod.AddProductButtonContent),
  {
    loading: () => <AddProductButtonSkeleton />,
    ssr: true,
  }
);