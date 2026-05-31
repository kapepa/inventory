"use client"

import { useCallback } from 'react';
import { useQueryParamActions, useQueryParamValue } from '../providers/query-param-provider';

export const useQueryParam = (key: string) => {
  const { queryParams } = useQueryParamValue();
  const { setQueryParam } = useQueryParamActions();

  const value = queryParams.get(key) || '';

  const setValue = useCallback((newValue: string) => {
    setQueryParam(key, newValue);
  }, [key, setQueryParam]);

  return [value, setValue] as const;
};