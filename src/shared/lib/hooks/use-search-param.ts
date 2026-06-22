"use client"

import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryParam } from "./use-query-param";
import { useDebounce } from "./use-debounce";

interface UseSearchParamOptions {
  queryKey: string;
  debounceMs?: number;
}

export function useSearchParam({ queryKey, debounceMs = 1000 }: UseSearchParamOptions) {
  const [initialValue, setTerm] = useQueryParam(queryKey);
  const [inputValue, setInputValue] = useState(initialValue);
  const [isClient, setIsClient] = useState(false);
  const debouncedValue = useDebounce(inputValue, debounceMs);
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
    setTerm("");
    setInputValue("");
  }, [setTerm]);

  return {
    inputValue,
    setInputValue,
    debouncedValue,
    isClient,
    clearInput,
  };
}