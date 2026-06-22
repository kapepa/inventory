"use client"

import { cn, QUERY_PARAMS_KEYS, useSearchParam, SearchWithClear } from "@/shared";
import { memo } from "react";
import { useTranslations } from "next-intl";

export const SearchInput = memo(({ className }: { className: string }) => {
  const t = useTranslations('parishes-search');
  const { inputValue, setInputValue, isClient, clearInput } = useSearchParam({
    queryKey: QUERY_PARAMS_KEYS.PARISHES_SEARCH,
    debounceMs: 1000,
  });

  return (
    <SearchWithClear
      placeholder={t("placeholder")}
      onChange={(e) => setInputValue(e.target.value)}
      value={inputValue}
      clearInputAction={clearInput}
      isClient={isClient}
      className={cn("bg-static border-t-2 ", className)}
      name={QUERY_PARAMS_KEYS.PARISHES_SEARCH}
      type="text"
    />
  );
});