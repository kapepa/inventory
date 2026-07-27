import { cn, LanguageSwitcher } from "@/shared";
import { SidebarNav } from "./sidebar-nav"
import { SidebarUser } from "./sidebar-user"
import { ArrowBigLeft, Menu } from "lucide-react";
import styles from './sidebar.module.css'
import { memo } from "react";

export const Sidebar = memo(
  () => {
    const htmlFor = "sidebar-toggle"
    return (
      <>
        {/* Hidden checkbox */}
        <input
          id={htmlFor}
          type="checkbox"
          className={styles.sidebarToggle}
          aria-label="Toggle the sidebar"
        />

        <aside
          aria-label="Side Panel"
          className={cn("shadow-right-lg px-10 sm:px-16 z-30 bg-background", styles.sidebar)}
        >
          <div className="flex flex-col justify-center items-center h-full">
            <div className="pb-10 md:pb-20 flex flex-col gap-y-6 md:gap-y-10">
              <LanguageSwitcher />
              <SidebarUser />
            </div>
            <SidebarNav />
          </div>

          {/* Label button for switching */}
          <label
            htmlFor={htmlFor}
            className={cn(
              "block rounded-full p-2 sm:p-4 shadow-lg transition-all top-1/2 -translate-y-1/2 z-40 border-2 bg-background opacity-50 hover:opacity-100",
              styles.sidebarLabel
            )}
            aria-label="side panel of the switch"
          >
            <Menu
              size={30}
              className={cn("text-accent", styles.menuIcon)}
              aria-hidden="true"
            />
            <ArrowBigLeft
              size={30}
              className={cn("text-accent", styles.arrowIcon)}
              aria-hidden="true"
            />
          </label>
        </aside>
      </>
    )
  }
)
