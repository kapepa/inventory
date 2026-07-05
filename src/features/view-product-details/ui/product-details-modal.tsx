import { ProductDetails, ProductWithRelationsWide, ProductWithRelationsShort } from "@/entities";
import { SubmitButton, ModalBody, ModalContents, ModalFooter, ModalHeader } from "@/shared"
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