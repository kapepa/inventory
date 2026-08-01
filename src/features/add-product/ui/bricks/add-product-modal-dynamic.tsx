"use client"

import dynamic from "next/dynamic";

export const AddProductModalDynamic = dynamic(() =>
  import("./add-product-modal").then(mod => mod.AddProductModal),
  {
    ssr: false,
  }
);