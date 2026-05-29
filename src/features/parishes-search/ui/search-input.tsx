"use client"

import { cn, Input } from "@/shared";
import { useDebounce } from "@/shared/lib/hooks/use-debounce";
import { ChangeEvent, useEffect, useState } from "react";
import { useParishesStore } from "../model/parishes-store";
import { useTranslations } from "next-intl";

interface SearchInputProps {
  className?: string
}

export const SearchInput = (props: SearchInputProps) => {
  const t = useTranslations('header');
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);
  const { query, search, setQuery } = useParishesStore();

  useEffect(() => {
    setQuery(debouncedValue);
    search(debouncedValue);
  }, [debouncedValue, search, setQuery]);

  const handlerChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  return (
    <Input
      placeholder={t("parishes-search.placeholder")}
      className={cn("font-bold placeholder:font-bold border-t-2 border-t-gray-400 rounded-s-sm", props.className)}
      onChange={handlerChangeSearchInput}
      defaultValue={query}
    />
  );
};
