import { useUsersStore } from "@/entities/user/model/users-store"
import { UsersState } from "@/entities/user/model/types/types"
import { CountTotalStore } from "@/widgets/page-header/lib/types/types"
import { CountTotal } from "./count-total"

export const ContTotalUsers = ({ fallbackCount, className }: CountTotalStore) => {
  const total = useUsersStore((state: UsersState) => state.total);
  const displayTotal = total === null ? (fallbackCount ?? 0) : total

  return <CountTotal total={displayTotal} className={className} />
}