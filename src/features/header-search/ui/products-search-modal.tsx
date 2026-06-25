import { ModalBody, ModalCancelButton, ModalContents, ModalFooter, ModalHeader } from "@/shared";
import { useTranslations } from "next-intl";
import { ProductsInput } from "./products-input";

interface ProductsSearchModalProps {
  onCancelAction: () => void
}

export const ProductsSearchModal = ({ onCancelAction }: ProductsSearchModalProps) => {
  const t = useTranslations('header-search');

  return (
    <ModalContents>
      <ModalHeader title={t('products-search.popup-title')} />
      <ModalBody>
        <ProductsInput className="p-4 text-base md:p-5 md:text-xl" />
      </ModalBody>
      <ModalFooter className="flex justify-end">
        <ModalCancelButton
          className="max-w-1/2 min-w-20 flex-1"
          onCancelAction={onCancelAction}
        >
          {t("buttons.close")}
        </ModalCancelButton>
      </ModalFooter>
    </ModalContents>
  )

}

ProductsSearchModal.displayName = "ProductsSearchModal"