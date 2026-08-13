"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { Settings } from "lucide-react"
import { useTranslations } from "next-intl";
import { memo, useCallback, useTransition } from "react";
import { requestAuthLogout } from "../api";
import { toast } from "@/shared/ui/sonner";
import { cn } from "@/shared/lib/utils";
import { ROUTES } from "@/shared/constants/routes";
import { useRouter } from "@/shared/lib/i18n/routing";
import { useUnmountCallback } from "@/shared/lib/hooks/use-unmount-callback";
import { useAuthStore } from "../model/auth-store";
import { Button } from "@/shared/ui/button";

interface LoginButtonProps {
  className?: string
}

export const LoginButton = memo(({ className }: LoginButtonProps) => {
  const router = useRouter();
  const t = useTranslations('auth.login-button');
  const [isPending, startTransition] = useTransition();
  const { setCallback } = useUnmountCallback()

  const handleLogout = useCallback(() => {
    startTransition(async () => {
      try {
        await requestAuthLogout();
        router.push(ROUTES.LOGIN);
        setCallback(() => {
          toast.success(t("toast.logout-success"))
          useAuthStore.getState().logout()
        })
      } catch (error) {
        console.error('Logout error:', error);
        toast.error(t("toast.logout-error"));
      }
    });
  }, [t, router])

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
          aria-label="settings"
          type="button"
        >
          <Settings
            strokeWidth={2}
            className="size-7 text-chart-4"
            aria-hidden="true"
          />
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
})

LoginButton.displayName = "LoginButton"