"use client"

import { useState, useEffect } from "react";
import { useQueryParam } from "./use-query-param";
import { QUERY_PARAMS_KEYS } from "../../constants/query-params-keys";

export const useActiveParishId = (initialId: string | null) => {
  const [activeParishId, setActiveParishId] = useQueryParam(QUERY_PARAMS_KEYS.ACTIVE_PARISH);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const id = isMounted ? activeParishId : (activeParishId || initialId);

  return [id, setActiveParishId] as const;
};