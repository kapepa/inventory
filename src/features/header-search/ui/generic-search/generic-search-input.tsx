"use client"

import { cn, useSearchParam, SearchWithClear, QueryParamsValue } from "@/shared";
import { InputHTMLAttributes, memo } from "react";

interface GenericSearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  queryKey: QueryParamsValue
}

export const GenericSearchInput = memo(({ queryKey, className, ...props }: GenericSearchInputProps) => {
  const { inputValue, setInputValue, clearInput } = useSearchParam({
    queryKey,
    debounceMs: 1000,
  });

  return (
    <SearchWithClear
      onChange={(e) => setInputValue(e.target.value)}
      value={inputValue}
      clearInputAction={clearInput}
      className={cn("bg-static border-t-2", className)}
      name={queryKey}
      type="text"
      {...props}
    />
  );
});

GenericSearchInput.displayName = "GenericSearchInput"