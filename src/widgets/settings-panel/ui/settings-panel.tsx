"use client"

import { AvatarUpload, ChangePasswordForm, DeleteAccount, InitialUserContext, RoleSelector } from "@/features"
import { ScrollArea } from "@/shared";
import { useContext } from "react";

export const SettingsPanel = () => {
  const user = useContext(InitialUserContext);

  if (!user) return null;

  return (
    <ScrollArea className="flex-1 min-h-0">
      <div className="grid grid-cols-1 place-items-center gap-y-6 m-auto pb-6 md:pb-16">
        <AvatarUpload user={user} />
        <ChangePasswordForm className="max-w-xl" />
        <RoleSelector className="max-w-xl" user={user} />
        <DeleteAccount user={user} />
      </div>
    </ScrollArea>
  )
}

SettingsPanel.displayName = "SettingsPanel"