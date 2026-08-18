import { ProductsState } from "@/entities/product/model/types/types"
import { useProductsStore } from "@/entities/product/model/products-store"
import { CountTotalStore } from "@/widgets/page-header/lib/types/types"
import { CountTotal } from "./count-total"
import { useEffect } from "react"

export const ContTotalProducts = ({ fallbackCount, className }: CountTotalStore) => {
  const total = useProductsStore((state: ProductsState) => state.total)
  const resetProductsStore = useProductsStore((state) => state.setReset);
  const displayTotal = total === null ? (fallbackCount ?? 0) : total

  useEffect(() => {
    return () => resetProductsStore()
  }, [])

  return <CountTotal total={displayTotal} className={className} />
}