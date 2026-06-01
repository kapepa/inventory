"use client"

import { cn, Input, useDebounce, useQueryParam, QUERY_PARAMS_KEYS } from "@/shared";
import { useEffect, useState, useRef } from "react";
import { useTranslations } from "next-intl";

export const SearchInput = ({ className }: { className: string }) => {
  const t = useTranslations('header');

  const [initialValue, setTerm] = useQueryParam(QUERY_PARAMS_KEYS.PARISHES_SEARCH);
  const [inputValue, setInputValue] = useState(initialValue);
  const debouncedValue = useDebounce(inputValue, 1000);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setTerm(debouncedValue);
  }, [debouncedValue, setTerm]);

  return (
    <Input
      placeholder={t("parishes-search.placeholder")}
      className={cn("font-bold placeholder:font-bold border-t-2 border-t-gray-400 rounded-s-sm", className)}
      onChange={(e) => setInputValue(e.target.value)}
      value={inputValue}
    />
  );
};