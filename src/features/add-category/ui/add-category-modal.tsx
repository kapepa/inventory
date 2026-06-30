import { ModalContents, ModalHeader } from "@/shared"
import { useTranslations } from "next-intl"
import { AddCategoryForm } from "./add-category-form"

interface AddCategoryModalProps {
  onCancelAction: () => void
}

export const AddCategoryModal = ({ onCancelAction }: AddCategoryModalProps) => {
  const t = useTranslations("add-category.form")
  return (
    <ModalContents>
      <ModalHeader title={t("title")} />
      <AddCategoryForm onCancelAction={onCancelAction} />
    </ModalContents>
  )
}