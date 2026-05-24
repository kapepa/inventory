import { SidebarNav } from "./sidebar-nav"
import { SidebarUser } from "./sidebar-user"

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 bottom-0 z-30 px-16 border-r shadow-right-lg">
      <div className="flex flex-col justify-center items-center h-full">
        <SidebarUser className="pb-20" />
        <SidebarNav />
      </div>
    </aside>
  )
}