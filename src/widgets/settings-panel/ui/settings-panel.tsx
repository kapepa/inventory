"use client"

import { AvatarUpload, ChangePasswordForm, InitialUserContext, RoleSelector } from "@/features"
import { useContext } from "react";

export const SettingsPanel = () => {
  const user = useContext(InitialUserContext);

  if (!user) return null;

  return (
    <div className="grid grid-cols-1 gap-y-6 m-auto">
      <AvatarUpload user={user} />
      <ChangePasswordForm className="max-w-xl" />
      <RoleSelector className="max-w-xl" user={user} />
    </div>
  )
}

SettingsPanel.displayName = "SettingsPanel"