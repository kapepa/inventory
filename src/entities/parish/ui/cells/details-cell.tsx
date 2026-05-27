import { Button, cn } from "@/shared"
import { Menu } from "lucide-react"

interface DetailsCellProps {
  description: string | null,
  className?: string
}

export const DetailsCell = ({ description, className }: DetailsCellProps) => {
  return (
    <div className={cn("", className)}>
      <Button className="cursor-pointer size-12 rounded-full" variant="outline">
        <Menu className="size-6 text-chart-4" strokeWidth={3} />
      </Button>
    </div>
  )
}