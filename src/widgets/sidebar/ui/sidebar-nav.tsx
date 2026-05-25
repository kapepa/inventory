'use client'

import { cn, NavLink } from "@/shared"
import { ClipboardList, GroupIcon, HomeIcon, Settings, UsersRound } from "lucide-react";
import { usePathname } from "next/navigation";

interface SidebarNavProps {
  className?: string
}

const navItems = [
  { href: '/', label: 'Главная', icon: HomeIcon },
  { href: '/groups', label: 'Группы', icon: GroupIcon },
  { href: '/inventory', label: 'Инвентарь', icon: ClipboardList },
  { href: '/users', label: 'Пользователи', icon: UsersRound },
  { href: '/settings', label: 'Настройки', icon: Settings },
];

export const SidebarNav = ({ className }: SidebarNavProps) => {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col items-center gap-y-7", className)}>
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          uppercase
          active={pathname === item.href}
          className="flex gap-x-3"
        >
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
