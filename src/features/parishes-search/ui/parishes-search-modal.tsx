import { ModalBody, ModalCancelButton, ModalContents, ModalFooter, ModalHeader } from "@/shared";
import { useTranslations } from "next-intl";
import { SearchInput } from "./search-input";

interface ParishesSearchModalProps {
  onCancelAction: () => void
}

export const ParishesSearchModal = ({ onCancelAction }: ParishesSearchModalProps) => {
  const t = useTranslations('parishes-search');

  return (
    <ModalContents>
      <ModalHeader title={t('popup-title')} />
      <ModalBody>
        <SearchInput className="p-4 text-base md:p-5 md:text-xl" />
      </ModalBody>
      <ModalFooter>
        <ModalCancelButton onCancelAction={onCancelAction}>{t("close")}</ModalCancelButton>
      </ModalFooter>
    </ModalContents>
  )

}

ParishesSearchModal.displayName = "ParishesSearchModal"