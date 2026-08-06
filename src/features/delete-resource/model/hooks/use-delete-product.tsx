"use client"

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useTransition } from "react";
import { toast } from "sonner";
import { requestDeleteProduct } from "../../api";
import { ForbiddenError, NotFoundError } from "@/shared/lib/errors";
import { useModalActions } from "@/shared/ui/modal";
import { DeleteConfirmModalDynamic } from "../../ui/delete-confirm-modal-dynamic";
import { ProductWithRelations } from "@/entities/product/model/types";

interface DeleteProductModalWrapperProps {
  title: string;
  productId: string;
  onCloseAction: () => void;
  onSuccess?: () => void;
}

const DeleteProductModalWrapper = ({
  title,
  productId,
  onCloseAction,
  onSuccess,
}: DeleteProductModalWrapperProps) => {
  const [isPending, startTransition] = useTransition();
  const t = useTranslations('groups');
  const tErrors = useTranslations('errors');

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        await requestDeleteProduct({ id: productId });
        toast.success(t("sonner.delete-product-success"));
        onSuccess?.();
      } catch (error) {
        if (error instanceof ForbiddenError) {
          toast.error(tErrors('admin-access-required'));
        } else if (error instanceof NotFoundError) {
          toast.error(t("sonner.delete-product-not-found"));
        } else {
          console.error(error);
          toast.error(t("sonner.delete-error-product"));
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

export const useDeleteProduct = <T extends ProductWithRelations>() => {
  const t = useTranslations('groups');
  const { openModal, closeModal } = useModalActions();

  const confirmDeleteProduct = useCallback((product: T, onSuccess?: () => void) => {
    const title = product.translations[0]?.title || "";

    openModal(
      <DeleteProductModalWrapper
        title={title}
        productId={product.id}
        onCloseAction={closeModal}
        onSuccess={onSuccess}
      />
    );
  }, [closeModal, openModal]);

  return { confirmDeleteProduct };
};

export const DeleteProductWrapper = <T extends ProductWithRelations>({ product, onSuccess }: { product: T, onSuccess?: () => void }) => {
  const { confirmDeleteProduct } = useDeleteProduct();

  useEffect(() => {
    confirmDeleteProduct(product, onSuccess);
  }, [product, onSuccess, confirmDeleteProduct]);

  return null;
}