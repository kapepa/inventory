"use client"

import { useHydratedUser } from "@/features/auth/model/hooks/use-hydrated-user";
import { ChangePasswordForm } from "@/features/change-password/ui/change-password-form";
import { RoleSelector } from "@/features/change-user-role/ui/role-selector";
import { DeleteAccount } from "@/features/delete-resource/ui/delete-account";
import { AvatarUpload } from "@/features/upload-avatar/ui/avatar-upload";

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