import { ModalContents, ModalHeader } from "@/shared/ui/modal/modal-contents"
import { Skeleton } from "@/shared/ui/skeleton"
import { AddCategoryFormSkeleton } from "../add-category-form-skeleton"

export const AddCategoryModalSkeleton = () => {
  return (
    <ModalContents>
      <ModalHeader title={<Skeleton className="h-5 w-1/2" />} />
      <AddCategoryFormSkeleton />
    </ModalContents>
  )
}

AddCategoryModalSkeleton.displayName = "AddCategoryModalSkeleton"