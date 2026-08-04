import { ModalContents, ModalHeader } from "@/shared/ui/modal"
import { AddParishFormSkeleton } from "../add-parish-form"
import { Skeleton } from "@/shared/ui"

export const AddParishModalSkeleton = () => {
  return (
    <ModalContents>
      <ModalHeader title={<Skeleton className="h-5 w-1/2" />} />
      <AddParishFormSkeleton />
    </ModalContents>
  )
}

AddParishModalSkeleton.displayName = "AddParishModalSkeleton"