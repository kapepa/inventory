"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { AuthTab } from "../model";
import { LoginForm, RegisterForm } from "@/features";
import { useState } from "react";
import { cn } from "@/shared";
import { useTranslations } from "next-intl";

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

        <TabsContent value="login" aria-selected={false}>
          <LoginForm />
        </TabsContent>

        <TabsContent value="register" aria-selected={false}>
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

AuthGate.displayName = "AuthGate"