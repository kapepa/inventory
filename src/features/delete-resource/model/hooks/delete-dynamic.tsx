"use client"

import dynamic from "next/dynamic";

export const DeleteParishDynamic = dynamic(
  () => import("./use-delete-parish").then(m => ({
    default: m.DeleteParishWrapper
  })),
  { ssr: false }
);

export const DeleteProductDynamic = dynamic(
  () => import("./use-delete-product").then(m => ({
    default: m.DeleteProductWrapper
  })),
  { ssr: false }
);


export const DeleteCategoryDynamic = dynamic(
  () => import("./use-delete-category").then(m => ({
    default: m.DeleteCategoryhWrapper
  })),
  { ssr: false }
);

export const DeleteAccountDynamic = dynamic(
  () => import("./use-delete-account").then(m => ({
    default: m.DeleteAccounthWrapper
  })),
  { ssr: false }
);