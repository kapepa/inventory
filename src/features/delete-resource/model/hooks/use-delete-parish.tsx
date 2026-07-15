"use client"

import { ForbiddenError, HasDependenciesError, NotFoundError, useModalActions } from "@/shared";
import { ParishesType } from "@/entities";
import { DeleteConfirmModal } from "../../ui/delete-confirm-modal";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useCallback, useTransition } from "react";
import { requestDeleteParish } from "../../api";

interface DeleteParishModalWrapperProps {
  title: string;
  parishId: string;
  onCloseAction: () => void;
  onSuccess?: () => void;
}

export const DeleteParishModalWrapper = ({
  title,
  parishId,
  onCloseAction,
  onSuccess,
}: DeleteParishModalWrapperProps) => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('parish');
  const tErrors = useTranslations('errors');

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        await requestDeleteParish({ id: parishId });
        toast.success(t("sonner.delete-parish-success"));
        onSuccess?.();
      } catch (error) {
        if (error instanceof ForbiddenError) {
          toast.error(tErrors('admin-access-required'));
        } else if (error instanceof NotFoundError) {
          toast.error(t("sonner.delete-parish-not-found"));
        } else if (error instanceof HasDependenciesError) {
          toast.error(t("sonner.delete-parish-has-products"));
        } else {
          console.log(error);
          toast.error(t("sonner.delete-error-parish"));
        }
      } finally {
        onCloseAction();
      }
    });
  };

  return (
    <DeleteConfirmModal
      title={title}
      isLoading={isPending}
      onConfirmAction={handleConfirm}
      onCancelAction={onCloseAction}
    />
  );
};

export const useDeleteParish = <T extends ParishesType>() => {
  const t = useTranslations('parish');
  const { openModal, closeModal } = useModalActions();

  const confirmDeleteParish = useCallback((parish: T, onSuccess?: () => void) => {
    const title = parish.translations[0]?.title || "";

    openModal(
      <DeleteParishModalWrapper
        title={title}
        parishId={parish.id}
        onCloseAction={closeModal}
        onSuccess={onSuccess}
      />
    );
  }, [closeModal, openModal, t]);

  return { confirmDeleteParish };
};