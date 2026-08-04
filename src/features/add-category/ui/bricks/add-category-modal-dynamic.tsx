"use client"

import dynamic from "next/dynamic";
import { AddCategoryModalSkeleton } from "./add-category-modal-skeleton";

export const AddCategoryModalDynamic = dynamic(() =>
  import("./add-category-modal").then(mod => mod.AddCategoryModal),
  {
    loading: () => <AddCategoryModalSkeleton />,
    ssr: false,
  }
);