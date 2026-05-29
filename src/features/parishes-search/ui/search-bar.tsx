"use client";

import { Button, cn } from "@/shared";
import { ModalContents, ModalHeader, useModalActions, ModalBody, ModalFooter, ModalCancelButton, ModalActionButton } from "@/shared/ui/modal";
import { Search } from "lucide-react";
import { SearchInput } from "./search-input";
import { memo } from "react";
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

interface SearchBarProps {
  className?: string
}

export const SearchBar = memo(
  (props: SearchBarProps) => {
    const { openModal, closeModal } = useModalActions();

    return (
      <>
        <div className={cn("hidden lg:flex items-center grow", props.className)}>
          <SearchInput
            className="w-xs"
          />
        </div>
        <div className="flex lg:hidden items-center justify-end md:justify-center  grow">
          <Button
            variant="link"
            className="rounded-s-sm cursor-pointer"
            onClick={() => openModal(<ModalSearchView closeModal={closeModal} />)}
          >
            <Search className="size-9 text-accent" />
          </Button>
        </div>
      </>
    );
  }
)

