"use client"

import { cn, Input, useDebounce, useQueryParam, QUERY_PARAMS_KEYS, Button } from "@/shared";
import { useEffect, useState, useRef, useCallback, memo } from "react";
import { useTranslations } from "next-intl";
import { Eraser } from "lucide-react";

export const SearchInput = memo(({ className }: { className: string }) => {
  const t = useTranslations('header');

  const [initialValue, setTerm] = useQueryParam(QUERY_PARAMS_KEYS.PARISHES_SEARCH);
  const [inputValue, setInputValue] = useState(initialValue);
  const [isClient, setIsClient] = useState(false);
  const debouncedValue = useDebounce(inputValue, 1000);

  const isFirstRender = useRef(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setTerm(debouncedValue);
  }, [debouncedValue, setTerm]);

  const clearInput = useCallback(() => {
    setTerm("")
    setInputValue("")
  }, [setTerm, setInputValue])

  return (
    <div className="relative">
      <Input
        placeholder={t("parishes-search.placeholder")}
        className={cn("font-bold placeholder:font-bold border-t-2 border-t-gray-400 rounded-s-sm pr-12", className)}
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        maxLength={100}
      />
      <Button
        variant="link"
        className="cursor-pointer absolute top-0 right-0 bottom-0 h-full"
        onClick={clearInput}
        disabled={!isClient || !inputValue.length}
      >
        <Eraser className="text-accent size-7" />
      </Button>
    </div>
  );
});