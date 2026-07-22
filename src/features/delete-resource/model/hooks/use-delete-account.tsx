"use client"

import { ForbiddenError, ROUTES, useModalActions, useRouter, useUnmountCallback } from "@/shared";
import { useTranslations } from "next-intl";
import { useCallback, useTransition } from "react";
import { toast } from "sonner";
import { AuthenticatedUser, useAuthStore } from "@/features/auth";
import { requestDeleteAccount } from "../../api";
import { DeleteConfirmModalDynamic } from "../../ui";

interface DeleteUserModalWrapperProps {
  user: AuthenticatedUser;
  onCloseAction: () => void;
}

const DeleteUserModalWrapper = ({
  user,
  onCloseAction,
}: DeleteUserModalWrapperProps) => {
  const t = useTranslations('user.delete-account');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { setCallback } = useUnmountCallback()

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        await requestDeleteAccount();
        router.push(ROUTES.AUTH);
        setCallback(() => {
          toast.success(t("toast.success"));
          useAuthStore.getState().logout()
        })
      } catch (error) {
        if (error instanceof ForbiddenError) {
          toast.error(t("toast.unauthorized"));
        } else {
          toast.error(t("toast.error"));
          console.error(error);
        }
      } finally {
        onCloseAction();
      }
    });
  };

  return (
    <DeleteConfirmModalDynamic
      title={t("title", { name: user.name })}
      isLoading={isPending}
      onConfirmAction={handleConfirm}
      onCancelAction={onCloseAction}
    />
  );
};

export const useDeleteUser = () => {
  const { openModal, closeModal } = useModalActions();

  const confirmDeleteUser = useCallback((user: AuthenticatedUser) => {
    openModal(
      <DeleteUserModalWrapper
        user={user}
        onCloseAction={closeModal}
      />
    );
  }, [closeModal, openModal]);

  return { confirmDeleteUser };
};