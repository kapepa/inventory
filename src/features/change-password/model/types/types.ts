export type ChangePasswordType = {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordFormLabels {
  title: string;
  currentPasswordLabel: string;
  currentPasswordPlaceholder: string;
  newPasswordLabel: string;
  newPasswordPlaceholder: string;
  confirmPasswordLabel: string;
  confirmPasswordPlaceholder: string;
  resetButton: string;
  changePasswordButton: string;
}