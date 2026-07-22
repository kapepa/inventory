"use client"

import { useCallback } from 'react';
import { useQueryParamActions, useQueryParamValue } from '../providers/query-param-provider';
import { QueryParamsValue } from '@/shared/types';

export const useQueryParam = (key: QueryParamsValue) => {
  const { queryParams } = useQueryParamValue();
  const { setQueryParam } = useQueryParamActions();

  const value = queryParams.get(key) || '';

  const setValue = useCallback((newValue: string | ((prev: string) => string | null)) => {
    if (typeof newValue === 'function') {
      const currentParams = new URLSearchParams(window.location.search);
      const prevValue = currentParams.get(key) || '';
      const computedValue = newValue(prevValue);
      setQueryParam(key, computedValue || '');
    } else {
      setQueryParam(key, newValue);
    }
  }, [key, setQueryParam]);

  return [value, setValue] as const;
};