"use client"

import dynamic from "next/dynamic";

export const AddCategoryModalDynamic = dynamic(() =>
  import("./add-category-modal").then(mod => mod.AddCategoryModal)
);