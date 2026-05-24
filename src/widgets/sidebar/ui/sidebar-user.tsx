import { LoginButton } from "@/features"
import { cn } from "@/shared/lib/utils"
import { CircleUserRound } from "lucide-react"

interface SidebarUserProps {
  className?: string
}

export const SidebarUser = ({ className }: SidebarUserProps) => {
  return (
    <div className={cn("", className)}>
      <div className="size-30 bg-chart-2 rounded-full relative">
        <CircleUserRound />
        <LoginButton className="absolute right-0 bottom-0" />
      </div>
    </div>
  )
}