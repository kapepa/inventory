'use client'

import { cn, NavLink, ROUTES, usePathname } from "@/shared"
import { Building2, ClipboardList, GroupIcon, Settings, UsersRound } from "lucide-react";

import { useTranslations } from "next-intl";
import { memo, useMemo } from "react";

interface SidebarNavProps {
  className?: string
  pathname: string
}

const SidebarNavInner = memo(
  ({ className, pathname }: SidebarNavProps) => {
    const t = useTranslations("sidebar");

    const navItems = useMemo(() => [
      { href: ROUTES.PARISHES, label: t('nav.parishes'), icon: Building2 },
      { href: ROUTES.GROUPS, label: t('nav.groups'), icon: GroupIcon },
      { href: ROUTES.INVENTORY, label: t('nav.inventory'), icon: ClipboardList },
      { href: ROUTES.USERS, label: t('nav.users'), icon: UsersRound },
      { href: ROUTES.SETTINGS, label: t('nav.settings'), icon: Settings },
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

export const SidebarNav = ({ className }: Omit<SidebarNavProps, 'pathname'>) => {
  const pathname = usePathname();

  return <SidebarNavInner className={className} pathname={pathname} />;
}
