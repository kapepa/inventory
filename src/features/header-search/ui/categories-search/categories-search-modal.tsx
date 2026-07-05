import { ModalBody, CancelButton, ModalContents, ModalFooter, ModalHeader } from "@/shared";
import { useTranslations } from "next-intl";
import { CategoriesInput } from "./categories-input";

interface CategoriesSearchModalProps {
  onCancelAction: () => void
}

export const CategoriesSearchModal = ({ onCancelAction }: CategoriesSearchModalProps) => {
  const t = useTranslations('header-search');

  return (
    <ModalContents>
      <ModalHeader title={t('parishes-search.popup-title')} />
      <ModalBody>
        <CategoriesInput className="p-4 text-base md:p-5 md:text-xl" />
      </ModalBody>
      <ModalFooter className="flex justify-end">
        <CancelButton
          className="max-w-1/2 min-w-20 flex-1"
          onCancelAction={onCancelAction}
        >
          {t("buttons.close")}
        </CancelButton>
      </ModalFooter>
    </ModalContents>
  )

}

CategoriesSearchModal.displayName = "CategoriesSearchModal"