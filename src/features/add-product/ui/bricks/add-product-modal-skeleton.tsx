import { Skeleton } from "@/shared/ui"
import { ModalContents, ModalHeader } from "@/shared/ui/modal"
import { AddProductFormSkeleton } from "../add-product-form"

export const AddProductModalSkeleton = () => {
  return (
    <ModalContents className='h-[90vh] p-0 flex flex-col gap-0 overflow-hidden w-full'>
      <ModalHeader title={<Skeleton className="h-5 w-1/2" />} className='shrink-0' />
      <AddProductFormSkeleton />
    </ModalContents>
  )
}

AddProductModalSkeleton.displayName = "AddProductModalSkeleton"