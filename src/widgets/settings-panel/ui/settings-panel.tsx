import { AuthenticatedUser } from "@/features/auth/model/types";
import { ChangePasswordForm } from "@/features/change-password/ui/change-password-form";
import { RoleSelector } from "@/features/change-user-role/ui/role-selector";
import { DeleteAccount } from "@/features/delete-resource/ui/delete-account";
import { AvatarUpload } from "@/features/upload-avatar/ui/avatar-upload";

interface SettingsPanelProps {
  user: AuthenticatedUser
}

export const SettingsPanel = ({ user }: SettingsPanelProps) => {
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