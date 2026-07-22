"use client"

import dynamic from "next/dynamic";

export const ProductDetailsModalDynamic = dynamic(() =>
  import("./product-details-modal").then(mod => mod.ProductDetailsModal)
);