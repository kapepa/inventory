"use client"

import { useHydratedUser } from "@/features/auth/model/hooks/use-hydrated-user"
import { LoginButton, LoginButtonSkeleton } from "@/features/auth/ui/login-button"
import { cn } from "@/shared/lib/utils";
import { ProfileAvatar, ProfileAvatarSkeleton } from "@/shared/ui"
import { memo } from "react"

interface SidebarUserProps {
  className?: string
}

export const SidebarUser = memo(
  ({ className }: SidebarUserProps) => {
    const user = useHydratedUser()

    return (
      <div className={cn("", className)}>
        <div className="relative size-30">
          <ProfileAvatar url={user?.imageUrl} name={user?.name} />
          <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4">
            <LoginButton />
          </div>
        </div>
      </div>
    )
  }
)

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
