import { ModalBody, ModalCancelButton, ModalContents, ModalFooter, ModalHeader } from "@/shared";
import { useTranslations } from "next-intl";
import { ParishesInput } from "./parishes-input";

interface ParishesSearchModalProps {
  onCancelAction: () => void
}

export const ParishesSearchModal = ({ onCancelAction }: ParishesSearchModalProps) => {
  const t = useTranslations('header-search');

  return (
    <ModalContents>
      <ModalHeader title={t('parishes-search.popup-title')} />
      <ModalBody>
        <ParishesInput className="p-4 text-base md:p-5 md:text-xl" />
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

ParishesSearchModal.displayName = "ParishesSearchModal"