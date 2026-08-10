import { SidebarUser } from "./sidebar-user"
import { SidebarNav } from "./sidebar-nav"
import { LanguageSwitcher } from "@/shared/ui/language/language-switcher"
import { cn } from "@/shared/lib/utils";

export const SidebarBody = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col justify-center items-center h-full", className)}>
      <div className="pb-10 md:pb-20 flex flex-col gap-y-6 md:gap-y-10">
        <LanguageSwitcher />
        <SidebarUser />
      </div>
      <SidebarNav />
    </div>
  )
}

SidebarBody.displayName = "SidebarBody"