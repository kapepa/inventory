import { useParishesStore } from "@/entities/parish/model/parish-store"
import { ParishesState } from "@/entities/parish/model/types/types"
import { CountTotalStore } from "@/widgets/page-header/lib/types/types"
import { CountTotal } from "./count-total"

export const ContTotalParish = ({ fallbackCount, className }: CountTotalStore) => {
  const total = useParishesStore((state: ParishesState) => state.total)
  const displayTotal = total === null ? (fallbackCount ?? 0) : total

  return <CountTotal total={displayTotal} className={className} />
}