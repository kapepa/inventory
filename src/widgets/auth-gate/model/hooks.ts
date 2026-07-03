"use client";

import { useState, useCallback } from "react";
import { AuthTab } from "./types";
import { STORAGE_KEYS } from "@/shared";
import { isAuthTab } from "./guards";

const AUTH_TAB_STORAGE_KEY = STORAGE_KEYS.AUTH_TAB_STORAGE_KEY

export function useStoredTab(defaultValue: AuthTab = "login"): { activeTab: AuthTab, setActiveTab: (value: AuthTab) => void } {
  const [value, setValue] = useState<AuthTab>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(AUTH_TAB_STORAGE_KEY);
      if (isAuthTab(stored)) return stored;
    }
    return defaultValue;
  });

  const setActiveTab = useCallback(
    (newValue: AuthTab) => {
      setValue(newValue);
      localStorage.setItem(AUTH_TAB_STORAGE_KEY, newValue);
    },
    []
  );

  return { activeTab: value, setActiveTab };
}