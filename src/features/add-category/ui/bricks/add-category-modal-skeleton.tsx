import { ModalContents, ModalHeader } from "@/shared/ui/modal"
import { AddCategoryFormSkeleton } from "../add-category-form"
import { Skeleton } from "@/shared/ui"

export const AddCategoryModalSkeleton = () => {
  return (
    <ModalContents>
      <ModalHeader title={<Skeleton className="h-5 w-1/2" />} />
      <AddCategoryFormSkeleton />
    </ModalContents>
  )
}

AddCategoryModalSkeleton.displayName = "AddCategoryModalSkeleton"