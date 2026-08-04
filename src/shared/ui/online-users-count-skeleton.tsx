import { UsersRound } from "lucide-react"
import { Skeleton } from "./skeleton"

export const OnlineUsersCountSkeleton = ({ valueZero }: { valueZero?: boolean }) => {
  return (
    <div className="flex items-center gap-x-3">
      <UsersRound strokeWidth={3} className="w-4 h-4 text-accent" />
      {valueZero ? <span>0</span> : <Skeleton className="h-6 w-6" />}
    </div>
  )
}


OnlineUsersCountSkeleton.displayName = "OnlineUsersCountSkeleton"