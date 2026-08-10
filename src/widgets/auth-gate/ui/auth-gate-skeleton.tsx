import { cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/ui/skeleton";

export const AuthGateSkeleton = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return (
    <div className={cn("w-full max-w-md mx-auto bg-card rounded-lg shadow-lg overflow-hidden", className)}>
      <div className="grid w-full grid-cols-2 p-6 gap-x-2">
        <Skeleton className="w-full h-8" />
        <Skeleton className="w-full h-8" />
      </div>
      {children}
    </div>
  )
}

AuthGateSkeleton.displayName = "AuthGateSkeleton"