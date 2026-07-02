"use client";

import { Button, cn } from "@/shared";
import { Search } from "lucide-react";
import { UsersInput } from "./users-input";
import { memo } from "react";
import { useUsersSearch } from "../../hooks";

interface UsersSearchProps {
  className?: string
}

export const UsersSearch = memo(
  (props: UsersSearchProps) => {
    const { openUsersSearch } = useUsersSearch()

    return (
      <>
        <div className={cn("hidden lg:flex items-center grow", props.className)}>
          <UsersInput
            className="w-xs"
          />
        </div>
        <div className="flex lg:hidden items-center justify-end md:justify-center grow">
          <Button variant="link" className="rounded-s-sm cursor-pointer" onClick={openUsersSearch}>
            <Search className="size-7 sm:size-9 text-accent" />
          </Button>
        </div>
      </>
    );
  }
)

UsersSearch.displayName = "UsersSearch"