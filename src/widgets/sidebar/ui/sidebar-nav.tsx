'use client'

import { cn, NavLink, usePathname } from "@/shared"
import { Building2, ClipboardList, GroupIcon, Settings, UsersRound } from "lucide-react";

import { useTranslations } from "next-intl";
import { memo, useMemo } from "react";

interface SidebarNavProps {
  className?: string
}

export const SidebarNav = memo(
  ({ className }: SidebarNavProps) => {
    const pathname = usePathname();
    const t = useTranslations("sidebar");

    const navItems = useMemo(() => [
      { href: '/', label: t('nav.parishes'), icon: Building2 },
      { href: '/groups', label: t('nav.groups'), icon: GroupIcon },
      { href: '/inventory', label: t('nav.inventory'), icon: ClipboardList },
      { href: '/users', label: t('nav.users'), icon: UsersRound },
      { href: '/settings', label: t('nav.settings'), icon: Settings },
    ], [t]);

    return (
      <nav className={cn("flex flex-col items-center gap-y-7", className)}>
        {navItems.map((item) => (
          <NavLink
            key={`${item.href}-${item.label}`}
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

)
