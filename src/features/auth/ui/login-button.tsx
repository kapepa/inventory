"use client"

import { Button, cn, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger, ROUTES, useRouter } from "@/shared"
import { Settings } from "lucide-react"
import { useTranslations } from "next-intl";
import { useCallback, useTransition } from "react";
import { requestAuthLogout } from "../api";
import { useAuthStore } from "../model";
import { toast } from "sonner";

interface LoginButtonProps {
  className?: string
}

export const LoginButton = ({ className }: LoginButtonProps) => {
  const router = useRouter();
  const t = useTranslations('auth.login-button');
  const [isPending, startTransition] = useTransition();
  const { logout } = useAuthStore();

  const handleLogout = useCallback(() => {
    startTransition(async () => {
      try {
        await requestAuthLogout();
        logout();
        router.push(ROUTES.AUTH);
        toast.success(t("toast.logout-success"));
      } catch (error) {
        console.error('Logout error:', error);
        toast.error(t("toast.logout-error"));
      }
    });
  }, [logout, router])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={
            cn(
              "size-14 rounded-full bg-background cursor-pointer",
              "shadow-sm hover:shadow-md transition-shadow duration-300",
              className
            )}
        >
          <Settings strokeWidth={2} className="size-7 text-chart-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={handleLogout}
            disabled={isPending}
          >
            {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}