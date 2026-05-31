"use client";

import { Button, cn, useModalQuery, ModalContents, ModalHeader, ModalBody, ModalFooter, ModalCancelButton, ModalActionButton, useModalActions } from "@/shared";
import { Search } from "lucide-react";
import { SearchInput } from "./search-input";
import { memo, useCallback } from "react";
import { useTranslations } from "next-intl";

const ModalSearchView = ({ closeModal }: { closeModal: () => void }) => {
  const t = useTranslations('header');

  return (
    <ModalContents>
      <ModalHeader title={t('parishes-search.popup-title')} />
      <ModalBody>
        <SearchInput className="p-5 text-xl" />
      </ModalBody>
      <ModalFooter>
        <ModalCancelButton onCancelAction={closeModal}>{t("parishes-search.close")}</ModalCancelButton>
        <ModalActionButton variant="simply-accent">{t("parishes-search.clear")}</ModalActionButton>
      </ModalFooter>
    </ModalContents>
  )
}

interface ParishesSearchProps {
  className?: string
}

export const ParishesSearch = memo(
  (props: ParishesSearchProps) => {
    const { openModal, closeModal } = useModalActions();

    const { open } = useModalQuery({
      modalName: 'parishes-search',
      onOpen: useCallback((closeQueryModal: () => void) => {
        openModal(<ModalSearchView closeModal={closeQueryModal} />);
      }, [openModal]),
      onClose: closeModal,
    });

    return (
      <>
        <div className={cn("hidden lg:flex items-center grow", props.className)}>
          <SearchInput
            className="w-xs"
          />
        </div>
        <div className="flex lg:hidden items-center justify-end md:justify-center grow">
          <Button variant="link" className="rounded-s-sm cursor-pointer" onClick={open}>
            <Search className="size-9 text-accent" />
          </Button>
        </div>
      </>
    );
  }
)
