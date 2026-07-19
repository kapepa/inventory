"use client"

import { AvatarUpload, ChangePasswordForm, DeleteAccount, InitialUserContext, RoleSelector, useHydratedUser } from "@/features"
import { useContext } from "react";

export const SettingsPanel = () => {
  const user = useHydratedUser();

  if (!user) return null;

  return (
    <div className="grid grid-cols-1 place-items-center gap-y-6 m-auto pb-6 md:pb-16">
      <AvatarUpload user={user} />
      <ChangePasswordForm className="max-w-xl" />
      <RoleSelector className="max-w-xl" user={user} />
      <DeleteAccount user={user} />
    </div>
  )
}

SettingsPanel.displayName = "SettingsPanel"