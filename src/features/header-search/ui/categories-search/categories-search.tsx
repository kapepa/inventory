"use client";

import { Button, cn } from "@/shared";
import { Search } from "lucide-react";
import { CategoriesInput } from "./categories-input";
import { memo } from "react";
import { useCategoriesSearch } from "../../hooks";

interface CategoriesSearchProps {
  className?: string
}

export const CategoriesSearch = memo(
  (props: CategoriesSearchProps) => {
    const { openCategoriesSearch } = useCategoriesSearch()

    return (
      <>
        <div className={cn("hidden lg:flex items-center grow", props.className)}>
          <CategoriesInput
            className="w-xs"
          />
        </div>
        <div className="flex lg:hidden items-center justify-end md:justify-center grow">
          <Button variant="link" className="rounded-s-sm cursor-pointer" onClick={openCategoriesSearch}>
            <Search className="size-7 sm:size-9 text-accent" />
          </Button>
        </div>
      </>
    );
  }
)

CategoriesSearch.displayName = "CategoriesSearch"