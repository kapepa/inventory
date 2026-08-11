import { ModalBody, ModalContents, ModalFooter, ModalHeader } from "@/shared/ui/modal/modal-contents"
import { SearchWithClearSkeleton } from "@/shared/ui/search-with-clear"
import { Skeleton } from "@/shared/ui/skeleton"

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