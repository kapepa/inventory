import { ModalContents, ModalHeader } from "@/shared"
import { useTranslations } from "next-intl"
import { AddParishForm } from "./add-parish-form"

interface AddParishModalProps {
  onOpenChange: () => void
}

export const AddParishModal = ({ onOpenChange }: AddParishModalProps) => {
  const t = useTranslations("parishe")
  return (
    <ModalContents>
      <ModalHeader title={t("form-created.title")} />
      <AddParishForm closeModalAction={onOpenChange} />
    </ModalContents>
  )
}

AddParishModal.displayName = "AddParishModal"