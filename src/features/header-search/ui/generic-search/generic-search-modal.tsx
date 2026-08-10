"use client"

import { CancelButton } from "@/shared/ui";
import { useTranslations } from "next-intl";
import { GenericSearchInput } from "./generic-search-input";
import { QueryParamsValue } from "@/shared/types";
import { ModalBody, ModalContents, ModalFooter, ModalHeader } from "@/shared/ui/modal/modal-contents";

interface GenericSearchModalProps {
  queryKey: QueryParamsValue
  placeholder: string,
  onCancelAction: () => void
}

export const GenericSearchModal = ({ queryKey, placeholder, onCancelAction }: GenericSearchModalProps) => {
  const t = useTranslations('header-search');

  return (
    <ModalContents>
      <ModalHeader title={t('popup-title')} />
      <ModalBody>
        <GenericSearchInput
          queryKey={queryKey}
          placeholder={placeholder}
          className="p-4 text-base md:p-5 md:text-xl"
        />
      </ModalBody>
      < ModalFooter className="flex justify-end" >
        <CancelButton
          variant="simply-accent"
          className="max-w-1/2 min-w-20 flex-1"
          onCancelAction={onCancelAction}
        >
          {t("buttons.close")}
        </CancelButton>
      </ModalFooter>
    </ModalContents>
  )
}

GenericSearchModal.displayName = "GenericSearchModal"