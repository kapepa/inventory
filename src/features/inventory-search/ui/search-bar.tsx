"use client";

import { Button, Input } from "@/shared";
import { cn } from "@/shared/lib";
import { Search } from "lucide-react";

interface SearchBarProps {
  className?: string
}

export const SearchBar = (props: SearchBarProps) => {
  return (
    <>
      <div className={cn("hidden lg:flex items-center grow", props.className)}>
        <Input
          placeholder="Поиск"
          className="w-xs font-bold placeholder:font-bold border-t-2 border-t-gray-400 rounded-s-sm"
        />
      </div>
      <div className="flex lg:hidden items-center justify-end md:justify-center  grow">
        <Button
          variant="link"
          className="rounded-s-sm"
        >
          <Search className="size-9 text-accent" />
        </Button>
      </div>
    </>
  );
};
