"use client"

import dynamic from "next/dynamic";

export const AddProductSheetDynamic = dynamic(() =>
  import("./add-product-sheet").then(mod => mod.AddProductSheet),
  {
    ssr: false,
  }
);