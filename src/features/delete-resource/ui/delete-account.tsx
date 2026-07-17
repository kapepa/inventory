"use client"

import { useContext } from "react";
import { cn, SubmitButton } from "@/shared";
import { useTranslations } from "next-intl";
import { useDeleteUser } from "../model";
import { AuthenticatedUser } from "@/features/auth";

interface DeleteAccountProps {
  user: AuthenticatedUser,
  className?: string,
}

export const DeleteAccount = ({ user, className }: DeleteAccountProps) => {
  const t = useTranslations('delete-account');
  const { confirmDeleteUser } = useDeleteUser()

  const handleDeleteAccount = () => {
    confirmDeleteUser(user)
  };

  return (
    <div className={cn("max-w-xl border-t flex flex-col items-center", className)}>
      <p className="text-sm text-muted-foreground mb-4" >
        {t('danger-zone.description')}
      </p>
      <SubmitButton
        variant="simply-destructive"
        className="p-4"
        onClick={handleDeleteAccount}
      >
        {t('danger-zone.delete-button')}
      </SubmitButton>
    </div>
  );
};

DeleteAccount.displayName = "DeleteAccount";