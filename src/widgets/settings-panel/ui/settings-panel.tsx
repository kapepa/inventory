"use client"

import { AvatarUpload, ChangePasswordForm, InitialUserContext, RoleSelector } from "@/features"
import { useContext } from "react";

export const SettingsPanel = () => {
  const user = useContext(InitialUserContext);

  if (!user) return null;

  return (
    <div className="flex flex-col items-center gap-y-6">
      <AvatarUpload user={user} />
      <ChangePasswordForm className="max-w-xl" />
      <RoleSelector user={user} />
    </div>
  )
}

SettingsPanel.displayName = "SettingsPanel"