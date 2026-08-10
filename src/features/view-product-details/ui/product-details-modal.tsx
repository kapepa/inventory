import { ProductWithRelationsShort, ProductWithRelationsWide } from "@/entities/product/model/types";
import { ProductDetails } from "@/entities/product/ui/product-details/product-details";
import { SubmitButton } from "@/shared/ui";
import { ModalBody, ModalContents, ModalFooter, ModalHeader } from "@/shared/ui/modal/modal-contents";
import { useTranslations } from "next-intl";

interface ProductDetailsModalProps {
  product: ProductWithRelationsWide | ProductWithRelationsShort
  onCancelAction: () => void;
}

export const ProductDetailsModal = ({ product, onCancelAction }: ProductDetailsModalProps) => {
  const t = useTranslations('view-product-details.product-details-modal');

  return (
    <ModalContents>
      <ModalHeader title={t("product-details")} />
      <ModalBody>
        <ProductDetails product={product} />
      </ModalBody>
      <ModalFooter>
        <SubmitButton
          variant="simply-accent"
          onConfirmAction={onCancelAction}
        >
          {t("ok")}
        </SubmitButton>
      </ModalFooter>
    </ModalContents>
  )
}

ProductDetailsModal.displayName = "ProductDetailsModal"