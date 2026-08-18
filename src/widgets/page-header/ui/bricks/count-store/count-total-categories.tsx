import { useCategoriesStore } from "@/entities/category/model/categories-store"
import { CategoriesState } from "@/entities/category/model/types/types"
import { CountTotalStore } from "@/widgets/page-header/lib/types/types"
import { CountTotal } from "./count-total"

export const ContTotalCategories = ({ fallbackCount, className }: CountTotalStore) => {
  const total = useCategoriesStore((state: CategoriesState) => state.total);
  const displayTotal = total === null ? (fallbackCount ?? 0) : total

  return <CountTotal total={displayTotal} className={className} />
}