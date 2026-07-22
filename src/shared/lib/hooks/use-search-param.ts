"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryParam } from "./use-query-param";
import { useDebounce } from "./use-debounce";
import { QueryParamsValue } from "@/shared/types";

interface UseSearchParamOptions {
  queryKey: QueryParamsValue;
  debounceMs?: number;
}

export function useSearchParam({ queryKey, debounceMs = 1000 }: UseSearchParamOptions) {
  const [initialValue, setTerm] = useQueryParam(queryKey);
  const [inputValue, setInputValue] = useState(initialValue);
  const debouncedValue = useDebounce(inputValue, debounceMs);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setTerm(debouncedValue);
  }, [debouncedValue, setTerm]);

  const clearInput = useCallback(() => {
    setTerm("");
    setInputValue("");
  }, [setTerm]);

  return {
    inputValue,
    debouncedValue,
    clearInput,
    setInputValue,
  };
}