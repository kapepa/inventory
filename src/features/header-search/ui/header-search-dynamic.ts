"use client"

import dynamic from "next/dynamic"

export const ParishesSearchDynamic = dynamic(
  () => import("./parishes-search").then(m => m.ParishesSearch),
  { ssr: false }
)

export const ProductsSearchDynamic = dynamic(
  () => import("./products-search").then(m => m.ProductsSearch),
  { ssr: false }
)

export const CategoriesSearchDynamic = dynamic(
  () => import("./categories-search").then(m => m.CategoriesSearch),
  { ssr: false }
)

export const UsersSearchDynamic = dynamic(
  () => import("./users-search").then(m => m.UsersSearch),
  { ssr: false }
)