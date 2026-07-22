"use client"

import dynamic from "next/dynamic";

export const ProductCreateSheetDynamic = dynamic(() =>
  import("./product-create-sheet").then(mod => mod.ProductCreateSheet)
);