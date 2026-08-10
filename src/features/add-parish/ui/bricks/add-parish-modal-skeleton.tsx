import { ModalContents, ModalHeader } from "@/shared/ui/modal/modal-contents"
import { AddParishFormSkeleton } from "../add-parish-form-skeleton"
import { Skeleton } from "@/shared/ui/skeleton"

export const AddParishModalSkeleton = () => {
  return (
    <ModalContents>
      <ModalHeader title={<Skeleton className="h-5 w-1/2" />} />
      <AddParishFormSkeleton />
    </ModalContents>
  )
}

AddParishModalSkeleton.displayName = "AddParishModalSkeleton"