import { useTranslations } from "next-intl"
import { AddParishForm } from "../add-parish-form"
import { ModalContents, ModalHeader } from "@/shared/ui/modal/modal-contents"

interface AddParishModalProps {
  onCancelAction: () => void
}

export const AddParishModal = ({ onCancelAction }: AddParishModalProps) => {
  const t = useTranslations("add-parish.form")
  return (
    <ModalContents>
      <ModalHeader title={t("title")} />
      <AddParishForm onCancelAction={onCancelAction} />
    </ModalContents>
  )
}

AddParishModal.displayName = "AddParishModal"