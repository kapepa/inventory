"use client"

import { Input } from "@/shared";
import { useDebounce } from "@/shared/lib/hooks/use-debounce";
import { cn } from "@/shared/lib/utils";
import { ChangeEvent, useEffect, useState } from "react";
import { useInventoryStore } from "../model/inventory-store";

interface SearchInputProps {
  className?: string
}

export const SearchInput = (props: SearchInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);
  const { query, search, setQuery } = useInventoryStore();

  useEffect(() => {
    setQuery(debouncedValue);
    search(debouncedValue);
  }, [debouncedValue, search, setQuery]);

  const handlerChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <Input
      placeholder="Поиск"
      className={cn("font-bold placeholder:font-bold border-t-2 border-t-gray-400 rounded-s-sm", props.className)}
      onChange={handlerChangeSearchInput}
      defaultValue={query}
    />
  );
};
