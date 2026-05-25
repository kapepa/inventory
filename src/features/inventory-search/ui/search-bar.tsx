"use client";

import { Button, cn } from "@/shared";
import { ModalContents, useModal } from "@/shared/ui/modal";
import { Search } from "lucide-react";
import { SearchInput } from "./search-input";

const ModalSearchView = () => {
  return (
    <ModalContents title="Поиск" className="px-7 pt-5 pb-8">
      <SearchInput className="p-5 text-xl" />
    </ModalContents>
  )
}

interface SearchBarProps {
  className?: string
}

export const SearchBar = (props: SearchBarProps) => {
  const { openModal } = useModal();

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
          onClick={() => openModal(<ModalSearchView />)}
        >
          <Search className="size-9 text-accent" />
        </Button>
      </div>
    </>
  );
};

