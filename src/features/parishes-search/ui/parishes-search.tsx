"use client";

import { Button, cn } from "@/shared";
import { Search } from "lucide-react";
import { SearchInput } from "./search-input";
import { memo } from "react";
import { useParishesSearch } from "../hooks";

interface ParishesSearchProps {
  className?: string
}

export const ParishesSearch = memo(
  (props: ParishesSearchProps) => {
    const { openParishesSearch } = useParishesSearch()

    return (
      <>
        <div className={cn("hidden lg:flex items-center grow", props.className)}>
          <SearchInput
            className="w-xs"
          />
        </div>
        <div className="flex lg:hidden items-center justify-end md:justify-center grow">
          <Button variant="link" className="rounded-s-sm cursor-pointer" onClick={openParishesSearch}>
            <Search className="size-7 sm:size-9 text-accent" />
          </Button>
        </div>
      </>
    );
  }
)
