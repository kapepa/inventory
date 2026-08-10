import { LanguageSwitcherSkeleton } from "@/shared/ui/language/language-switcher-skeleton"
import { SidebarNavSkeleton } from "./sidebar-nav-skeleton"
import { SidebarUserSkeleton } from "./sidebar-user-skeleton"

export const SidebarBodySkeleton = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="pb-10 md:pb-20 flex flex-col gap-y-6 md:gap-y-10">
        <LanguageSwitcherSkeleton />
        <SidebarUserSkeleton />
      </div>
      <SidebarNavSkeleton />
    </div>
  )
}

SidebarBodySkeleton.displayName = "SidebarBodySkeleton"