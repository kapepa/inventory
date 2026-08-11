import { AuthenticatedUser } from "@/features/auth/model/types";
import { ChangePasswordFormLabels } from "@/features/change-password/model/types/types";
import { ChangePasswordForm } from "@/features/change-password/ui/change-password-form";
import { RoleSelectorLabels } from "@/features/change-user-role/model/types/types";
import { RoleSelector } from "@/features/change-user-role/ui/role-selector";
import { DeleteAccountLabels } from "@/features/delete-resource/model/types/types";
import { DeleteAccount } from "@/features/delete-resource/ui/delete-account";
import { AvatarUploadLabels } from "@/features/upload-avatar/model/types/types";
import { AvatarUpload } from "@/features/upload-avatar/ui/avatar-upload";
import { getTranslations } from "next-intl/server";

interface SettingsPanelProps {
  user: AuthenticatedUser
}

export const SettingsPanel = async ({ user }: SettingsPanelProps) => {
  const tUpload = await getTranslations("avatar-upload");
  const tPassword = await getTranslations("change-password");
  const tRole = await getTranslations("change-user-role");
  const tDelete = await getTranslations("delete-account");

  const avatarLabels: AvatarUploadLabels = {
    description: tUpload("descriptions"),
    resetButton: tUpload("buttons.reset"),
    sendButton: tUpload("buttons.send"),
  };

  const passwordLabels: ChangePasswordFormLabels = {
    title: tPassword("title"),
    currentPasswordLabel: tPassword('labels.current-password'),
    currentPasswordPlaceholder: tPassword('placeholders.current-password'),
    newPasswordLabel: tPassword('labels.new-password'),
    newPasswordPlaceholder: tPassword('placeholders.new-password'),
    confirmPasswordLabel: tPassword('labels.confirm-password'),
    confirmPasswordPlaceholder: tPassword('placeholders.confirm-password'),
    resetButton: tPassword("buttons.reset"),
    changePasswordButton: tPassword("buttons.change-password"),
  };

  const roleLabels: RoleSelectorLabels = {
    title: tRole("title"),
    roleLabel: tRole('labels.role'),
    infoText: tRole("info"),
    selectPlaceholder: tRole('placeholders.select-role'),
    roleUser: tRole('roles.user'),
    roleAdmin: tRole('roles.admin'),
    resetButton: tRole("buttons.reset"),
    changeRoleButton: tRole("buttons.change-role"),
  };

  const deleteLabels: DeleteAccountLabels = {
    description: tDelete('danger-zone.description'),
    deleteButton: tDelete('danger-zone.delete-button'),
  };

  return (
    <div className="grid grid-cols-1 place-items-center gap-y-6 m-auto pb-6 md:pb-16">
      <AvatarUpload user={user} labels={avatarLabels} />
      <ChangePasswordForm className="max-w-xl" labels={passwordLabels} />
      <RoleSelector className="max-w-xl" user={user} labels={roleLabels} />
      <DeleteAccount user={user} labels={deleteLabels} />
    </div>
  )
}

SettingsPanel.displayName = "SettingsPanel"