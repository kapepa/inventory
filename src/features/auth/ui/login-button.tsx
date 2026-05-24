import { Button } from "@/shared"
import { cn } from "@/shared/lib/utils"
import { Settings } from "lucide-react"

interface LoginButtonProps {
  className?: string
}

export const LoginButton = ({ className }: LoginButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={
        cn(
          "size-16 rounded-full transform translate-x-1/4 translate-y-1/4 bg-background",
          "shadow-sm hover:shadow-md transition-shadow duration-300",
          className
        )}
    >
      <Settings strokeWidth={2} className="size-8 text-chart-4" />
    </Button>
  )
}