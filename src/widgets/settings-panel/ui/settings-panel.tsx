"use client"

import { AvatarUpload, ChangePasswordForm, InitialUserContext, RoleSelector } from "@/features"
import { useContext } from "react";

export const SettingsPanel = () => {
  const user = useContext(InitialUserContext);

  if (!user) return null;

  return (
    <div>
      <AvatarUpload user={user} />
      <ChangePasswordForm user={user} />
      <RoleSelector user={user} />
    </div>
  )
}

SettingsPanel.displayName = "SettingsPanel"