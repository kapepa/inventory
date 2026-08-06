import { SidebarUser, SidebarUserSkeleton } from "./sidebar-user"
import { SidebarNav, SidebarNavSkeleton } from "./sidebar-nav"
import { LanguageSwitcher, LanguageSwitcherSkeleton } from "@/shared/ui/language/language-switcher"
import { cn } from "@/shared/lib/utils";
import { memo } from "react"

export const SidebarBody = memo(({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col justify-center items-center h-full", className)}>
      <div className="pb-10 md:pb-20 flex flex-col gap-y-6 md:gap-y-10">
        <LanguageSwitcher />
        <SidebarUser />
      </div>
      <SidebarNav />
    </div>
  )
})

SidebarBody.displayName = "SidebarBody"

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