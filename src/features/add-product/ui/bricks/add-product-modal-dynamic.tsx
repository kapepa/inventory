"use client"

import dynamic from "next/dynamic";
import { AddProductModalSkeleton } from "./add-product-modal-skeleton";

export const AddProductModalDynamic = dynamic(() =>
  import("./add-product-modal").then(mod => mod.AddProductModal),
  {
    loading: () => <AddProductModalSkeleton />,
    ssr: false,
  }
);