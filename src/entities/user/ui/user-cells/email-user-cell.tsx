import { cn } from "@/shared/lib/utils";

interface EmailUserCellProps {
  label: string;
  email: string;
  className?: string;
}

export const EmailUserCell = ({ label, email, className }: EmailUserCellProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center", className)}>
      <small className="text-muted-foreground">{label}</small>
      <span>{email}</span>
    </div >
  )
}

EmailUserCell.displayName = "EmailUserCell"
