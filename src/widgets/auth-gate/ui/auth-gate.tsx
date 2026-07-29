"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { AuthTab } from "../model";
import { LoginForm } from "@/features";
import { useState } from "react";
import { cn } from "@/shared";
import { useTranslations } from "next-intl";
import { RegisterFormDynamic } from "@/features/auth/ui/register-form-dynamic";

export const AuthGate = () => {
  const t = useTranslations('auth-gate');
  const [activeTab, setActiveTab] = useState<AuthTab>("login")

  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-lg shadow-lg" suppressHydrationWarning>
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AuthTab)}>
        <TabsList className="grid w-full grid-cols-2 p-6">
          <TabsTrigger
            value="login"
            className={cn(
              "p-1 rounded-sm",
              activeTab === "login" ? "bg-accent-custom text-primary-foreground" : "cursor-pointer"
            )}
          >
            {t("login")}
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className={cn(
              "cursor-pointer p-1 rounded-sm",
              activeTab === "register" ? "bg-accent-custom text-primary-foreground" : "cursor-pointer"
            )}
          >
            {t("register")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <LoginForm />
        </TabsContent>

        <TabsContent value="register">
          <RegisterFormDynamic />
        </TabsContent>
      </Tabs>
    </div>
  )
}

AuthGate.displayName = "AuthGate"