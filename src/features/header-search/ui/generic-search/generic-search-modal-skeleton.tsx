import { SearchWithClearSkeleton, Skeleton } from "@/shared/ui"
import { ModalBody, ModalContents, ModalFooter, ModalHeader } from "@/shared/ui/modal/modal-contents"

export const GenericSearchModalSkeleton = () => {
  return (
    <ModalContents>
      <ModalHeader title={<Skeleton className="h-5 w-28" />} />
      <ModalBody>
        <SearchWithClearSkeleton />
      </ModalBody>
      <ModalFooter className="flex justify-end" >
        <Skeleton className="h-11 w-1/2 rounded-full" />
      </ModalFooter>
    </ModalContents>
  )
}

GenericSearchModalSkeleton.displayName = "GenericSearchModalSkeleton"