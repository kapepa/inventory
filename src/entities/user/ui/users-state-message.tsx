import { cn } from "@/shared"
import { memo } from "react";

interface UsersStateMessageProps {
  className?: string;
  children: React.ReactNode;
}

export const UsersStateMessage = memo(({ className, children }: UsersStateMessageProps) => {
  return (
    <div className={cn("flex items-center justify-center py-8 text-muted-foreground", className)}>
      {children}
    </div>
  )
})

UsersStateMessage.displayName = "UsersStateMessage"