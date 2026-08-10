import { Skeleton } from "@/shared/ui/skeleton"
import { ModalBody, ModalFooter } from "@/shared/ui/modal/modal-contents"
import { TranslationFieldsSkeleton } from "./bricks/translation-fields-skeleton"
import { DeliveryDateFieldSkeleton } from "./bricks/delivery-date-field-skeleton"

export const AddParishFormSkeleton = () => {
  return (
    <>
      <ModalBody>
        <Skeleton className="h-8 w-full" />
        <div className="flex flex-col w-full mt-2 mb-8.5 gap-6 md:gap-7 md:pb-7">
          <TranslationFieldsSkeleton />
          <DeliveryDateFieldSkeleton />
        </div>
      </ModalBody>
      <ModalFooter>
        <Skeleton className="h-11 w-full rounded-full" />
        <Skeleton className="h-11 w-full rounded-full" />
      </ModalFooter>
    </>
  )
}

AddParishFormSkeleton.displayName = "AddParishFormSkeleton"