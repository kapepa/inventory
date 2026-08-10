'use client'

import { useHydratedIsAdmin } from "@/features/auth/model/hooks/use-hydrated-user";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/lib/utils";
import { usePathname } from "@/shared/lib/i18n/routing";
import { NavLink, Skeleton } from "@/shared/ui";
import { BadgeInfo, Building2, ClipboardList, GroupIcon, LucideIcon, Settings, TextAlignStart, UsersRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { memo, useMemo } from "react";

interface SidebarNavProps {
  className?: string
  pathname: string
  isAdmin: boolean
}

interface NavItem {
  href: string,
  label: string,
  icon: LucideIcon,
}

const SidebarNavInner = memo(
  ({ className, pathname, isAdmin = false }: SidebarNavProps) => {
    const t = useTranslations("sidebar");

    const navItems: NavItem[] = useMemo(() => [
      { href: ROUTES.PARISHES, label: t('nav.parishes'), icon: Building2 },
      { href: ROUTES.GROUPS, label: t('nav.groups'), icon: GroupIcon },
      { href: ROUTES.PRODUCTS, label: t('nav.products'), icon: TextAlignStart },
      ...(isAdmin ? [
        { href: ROUTES.CATEGORIES, label: t('nav.categories'), icon: ClipboardList },
      ] : []),
      { href: ROUTES.USERS, label: t('nav.users'), icon: UsersRound },
      { href: ROUTES.ABOUT_US, label: t('nav.about-us'), icon: BadgeInfo },
      { href: ROUTES.SETTINGS, label: t('nav.settings'), icon: Settings },
    ], [t, isAdmin]);

    return (
      <nav className={cn("flex flex-col items-center gap-y-7", className)}>
        {navItems.map((item) => (
          <NavLink
            key={`${item.href}-${item.label}`}
            href={item.href}
            uppercase
            active={pathname === item.href || pathname.startsWith(item.href + '/')}
            className="flex gap-x-3"
          >
            <item.icon className="size-5" aria-label={item.label} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    )
  }
)

export const SidebarNav = ({ className }: { className?: string }) => {
  const pathname = usePathname();
  const isAdmin = useHydratedIsAdmin();

  return <SidebarNavInner className={className} pathname={pathname} isAdmin={isAdmin} />;
}

SidebarNav.displayName = "SidebarNav"