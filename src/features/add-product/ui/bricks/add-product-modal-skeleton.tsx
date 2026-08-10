import { Skeleton } from "@/shared/ui/skeleton"
import { ModalContents, ModalHeader } from "@/shared/ui/modal/modal-contents"
import { AddProductFormSkeleton } from "../add-product-form-skeleton"

export const AddProductModalSkeleton = () => {
  return (
    <ModalContents className='h-[90vh] p-0 flex flex-col gap-0 overflow-hidden w-full'>
      <ModalHeader title={<Skeleton className="h-5 w-1/2" />} className='shrink-0' />
      <AddProductFormSkeleton />
    </ModalContents>
  )
}

AddProductModalSkeleton.displayName = "AddProductModalSkeleton"