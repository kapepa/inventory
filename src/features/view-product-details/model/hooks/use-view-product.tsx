import { useCallback } from "react";
import { ProductDetailsModalDynamic } from "../../ui/product-details-modal.dynamic";
import { useModalActions } from "@/shared/ui/modal";
import { ProductWithRelationsShort, ProductWithRelationsWide } from "@/entities/product/model/types";

type ProductWithRelations = ProductWithRelationsShort | ProductWithRelationsWide

export const useViewProduct = <T extends ProductWithRelations>() => {
  const { openModal, closeModal } = useModalActions();

  const productDetails = useCallback((product: T) => {
    openModal(
      <ProductDetailsModalDynamic
        product={product}
        onCancelAction={closeModal}
      />
    );
  }, [closeModal, openModal]);

  return { productDetails };
}