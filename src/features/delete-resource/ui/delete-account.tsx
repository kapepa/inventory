"use client"

import { SubmitButton } from "@/shared/ui/action-buttons";
import { cn } from "@/shared/lib/utils";
import { AuthenticatedUser } from "@/features/auth/model/types";
import { useCallback } from "react";
import { DeleteAccountProvider, useDeleteAccountContext } from "@/shared/lib/providers/delete-account-context";
import { DeleteAccountLabels } from "../model/types/types";

interface DeleteAccountProps {
  user: AuthenticatedUser,
  labels: DeleteAccountLabels;
  className?: string,
}

export const DeleteAccountInner = ({ user, labels, className }: DeleteAccountProps) => {
  const { confirmAccountDelete } = useDeleteAccountContext()

  const handleDeleteAccount = useCallback(() => {
    confirmAccountDelete(user, () => { })
  }, []);

  return (
    <div className={cn("max-w-xl border-t flex flex-col items-center", className)}>
      <p className="text-sm text-muted-foreground mb-4" >
        {labels.description}
      </p>
      <SubmitButton
        variant="simply-destructive"
        className="p-4"
        onClick={handleDeleteAccount}
      >
        {labels.deleteButton}
      </SubmitButton>
    </div>
  );
};

DeleteAccountInner.displayName = "DeleteAccountInner";

export const DeleteAccount = (props: DeleteAccountProps) => {
  return (
    <DeleteAccountProvider>
      <DeleteAccountInner {...props} />
    </DeleteAccountProvider>
  )
}

DeleteAccount.displayName = "DeleteAccount";