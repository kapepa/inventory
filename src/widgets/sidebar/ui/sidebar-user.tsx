import { LoginButton } from "@/features"
import { cn, ProfileAvatar } from "@/shared"

interface SidebarUserProps {
  className?: string
}

export const SidebarUser = ({ className }: SidebarUserProps) => {
  const MocName = "Cate"
  const MocUrl = "/images/avatar-face.jpg"

  return (
    <div className={cn("", className)}>
      <div className="relative size-30">
        <ProfileAvatar url={MocUrl} name={MocName} />
        <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4">
          <LoginButton />
        </div>
      </div>
    </div>
  )
}