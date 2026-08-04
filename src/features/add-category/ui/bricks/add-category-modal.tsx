"use client"

import { AddCategoryForm, AddCategoryFormSkeleton } from "../add-category-form"
import { useTranslations } from "next-intl"
import { ModalContents, ModalHeader } from "@/shared/ui/modal"
import { Skeleton } from "@/shared/ui"

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

AddCategoryModal.displayName = "AddCategoryModal"