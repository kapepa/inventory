"use client"

import dynamic from "next/dynamic";

export const ProductCreateModalDynamic = dynamic(() =>
  import("./product-create-modal").then(mod => mod.ProductCreateModal)
);