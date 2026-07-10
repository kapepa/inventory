"use client"

import { AdminAccessRequiredError, CategoryHasProductsError, CategoryNotFoundError, useModalActions } from "@/shared";
import { useTranslations } from "next-intl";
import { useCallback, useTransition } from "react";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../../ui";
import { requestDeleteCategory } from "../../api/category-api";
import { CategoryWithProductCount } from "@/entities";

interface DeleteCategoryModalWrapperProps {
  title: string;
  categoryId: string;
  onCloseAction: () => void;
  onSuccess?: () => void;
}

export const DeleteCategoryModalWrapper = ({
  title,
  categoryId,
  onCloseAction,
  onSuccess,
}: DeleteCategoryModalWrapperProps) => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('category');
  const tErrors = useTranslations('errors');

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        await requestDeleteCategory({ id: categoryId });
        toast.success(t("sonner.delete-category-success"));
        onSuccess?.();
      } catch (error) {
        if (error instanceof AdminAccessRequiredError) {
          toast.error(tErrors('admin-access-required'));
        } else if (error instanceof CategoryNotFoundError) {
          toast.error(t("sonner.delete-error-category-not-found"));
        } else if (error instanceof CategoryHasProductsError) {
          toast.error(t("sonner.cannot-delete-with-products"));
        } else {
          toast.error(t("sonner.delete-error-category"));
          console.error(error);
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

export const useDeleteCategory = <T extends CategoryWithProductCount>() => {
  const t = useTranslations('category');
  const { openModal, closeModal } = useModalActions();

  const confirmDeleteCategory = useCallback((category: T, onSuccess?: () => void) => {
    const title = category.translations[0]?.title || "";

    if (category._count.products >= 1) {
      toast.error(t("sonner.cannot-delete-with-products"));
      return;
    }

    openModal(
      <DeleteCategoryModalWrapper
        title={title}
        categoryId={category.id}
        onCloseAction={closeModal}
        onSuccess={onSuccess}
      />
    );
  }, [closeModal, openModal, t]);

  return { confirmDeleteCategory };
};