import { LoginButtonSkeleton } from "@/features/auth/ui/login-button"
import { cn } from "@/shared/lib/utils"
import { ProfileAvatarSkeleton } from "@/shared/ui"

export const SidebarUserSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("", className)}>
      <div className="relative size-30">
        <ProfileAvatarSkeleton />
        <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4">
          <LoginButtonSkeleton />
        </div>
      </div>
    </div>
  )
}