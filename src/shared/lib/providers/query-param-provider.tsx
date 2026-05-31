"use client"

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, memo } from 'react';

interface QueryParamValueContextType {
  queryParams: URLSearchParams;
}

interface QueryParamActionsContextType {
  setQueryParam: (key: string, value: string) => void;
}

const QueryParamValueContext = createContext<QueryParamValueContextType | null>(null);
const QueryParamActionsContext = createContext<QueryParamActionsContextType | null>(null);

// A memoized wrapper for children, so that the provider doesn't have to re-render the entire tree when the state changes
const ChildrenWrapper = memo(({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
});

ChildrenWrapper.displayName = 'QueryParamChildrenWrapper';

export const QueryParamProvider = ({ children }: { children: React.ReactNode }) => {
  const [params, setParams] = useState(() =>
    new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
  );

  useEffect(() => {
    const handlePopState = () => {
      setParams(new URLSearchParams(window.location.search));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const setQueryParam = useCallback((key: string, value: string) => {
    const newParams = new URLSearchParams(window.location.search);

    if (newParams.get(key) === value) return;

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    const queryString = newParams.toString();
    const url = window.location.pathname + (queryString ? `?${queryString}` : '');

    window.history.replaceState(null, '', url);
    setParams(newParams);
  }, []);

  const valueState = useMemo(() => ({ queryParams: params }), [params]);
  const valueActions = useMemo(() => ({ setQueryParam }), [setQueryParam]);

  return (
    <QueryParamActionsContext.Provider value={valueActions}>
      <QueryParamValueContext.Provider value={valueState}>
        <ChildrenWrapper>
          {children}
        </ChildrenWrapper>
      </QueryParamValueContext.Provider>
    </QueryParamActionsContext.Provider>
  );
};

export const useQueryParamValue = () => {
  const context = useContext(QueryParamValueContext);
  if (!context) throw new Error('useQueryParamValue must be used within QueryParamProvider');
  return context;
};

export const useQueryParamActions = () => {
  const context = useContext(QueryParamActionsContext);
  if (!context) throw new Error('useQueryParamActions must be used within QueryParamProvider');
  return context;
};
