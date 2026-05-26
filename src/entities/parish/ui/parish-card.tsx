import { cn } from "@/shared"
import { Parish } from "@prisma/client"

interface ParishCardProps {
  parish: Parish
  onClick?: (parish: Parish) => void
  className?: string
}

export const ParishCard = ({ parish, onClick, className }: ParishCardProps) => {
  console.log(parish)
  return (
    <div
      className={cn(
        "p-4 border rounded-lg cursor-pointer transition-colors hover:bg-accent/10",
        className
      )}
      onClick={() => onClick?.(parish)}
    >
      <h3 className="text-lg font-semibold mb-2">{parish.name}</h3>
      {/* {parish.address && (
        <p className="text-sm text-muted-foreground">{parish.address}</p>
      )}
      {parish.priest && (
        <p className="text-sm text-muted-foreground">
          Священник: {parish.priest}
        </p>
      )} */}
    </div>
  )
}