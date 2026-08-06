"use client"

import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useTransition } from "react";
import { requestDeleteParish } from "../../api";
import { ForbiddenError, HasDependenciesError, NotFoundError } from "@/shared/lib/errors";
import { useModalActions } from "@/shared/ui/modal";
import { DeleteConfirmModalDynamic } from "../../ui/delete-confirm-modal-dynamic";
import { ParishesType } from "@/entities/parish/model/types";

interface DeleteParishModalWrapperProps {
  title: string;
  parishId: string;
  onCloseAction: () => void;
  onSuccess?: () => void;
}

const DeleteParishModalWrapper = ({
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
    <DeleteConfirmModalDynamic
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
  }, [closeModal, openModal]);

  return { confirmDeleteParish };
};

export const DeleteParishWrapper = <T extends ParishesType>({ parish, onSuccess }: { parish: T, onSuccess?: () => void }) => {
  const { confirmDeleteParish } = useDeleteParish();

  useEffect(() => {
    confirmDeleteParish(parish, onSuccess);
  }, [parish, onSuccess, confirmDeleteParish]);

  return null;
}