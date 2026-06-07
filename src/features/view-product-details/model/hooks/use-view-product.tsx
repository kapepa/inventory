import { ProductsWithRelations } from "@/entities";
import { useModalActions } from "@/shared";
import { useCallback } from "react";
import { ProductDetailsModal } from "../../ui";

export const useViewProduct = () => {
  const { openModal, closeModal } = useModalActions();

  const productDetails = useCallback((products: ProductsWithRelations) => {
    openModal(
      <ProductDetailsModal
        products={products}
        onCancelAction={closeModal}
      />
    );
  }, [closeModal, openModal]);

  return { productDetails };
}