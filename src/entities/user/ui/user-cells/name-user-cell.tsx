import { cn } from "@/shared/lib/utils"

interface NameUserCellProps {
  label: string
  name: string;
  className?: string;
}

export const NameUserCell = ({ label, name, className }: NameUserCellProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <small className="text-muted-foreground">{label}</small>
      <span>{name}</span>
    </div>
  )
}

NameUserCell.displayName = "NameUserCell"