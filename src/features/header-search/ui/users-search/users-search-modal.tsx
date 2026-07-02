import { ModalBody, ModalCancelButton, ModalContents, ModalFooter, ModalHeader } from "@/shared";
import { useTranslations } from "next-intl";
import { UsersInput } from "./users-input";

interface UsersSearchModalProps {
  onCancelAction: () => void
}

export const UsersSearchModal = ({ onCancelAction }: UsersSearchModalProps) => {
  const t = useTranslations('header-search');

  return (
    <ModalContents>
      <ModalHeader title={t('users-search.popup-title')} />
      <ModalBody>
        <UsersInput className="p-4 text-base md:p-5 md:text-xl" />
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

UsersSearchModal.displayName = "UsersSearchModal"