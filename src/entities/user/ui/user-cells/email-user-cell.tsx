import { cn, Skeleton } from "@/shared";

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

export const EmailUserCellSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center gap-y-2", className)}>
      <Skeleton className="w-18 h-4 rounded" />
      <Skeleton className="w-36 h-4 rounded" />
    </div>
  )
}

EmailUserCellSkeleton.displayName = "EmailUserCellSkeleton"
