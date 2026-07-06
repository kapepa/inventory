"use client"

import { useEffect, useRef } from 'react';

export const useUnmountCallback = () => {
  const callbackRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      if (callbackRef.current) {
        callbackRef.current();
        callbackRef.current = null;
      }
    };
  }, []);

  const setCallback = (callback: () => void) => {
    callbackRef.current = callback;
  };

  const clearCallback = () => {
    callbackRef.current = null;
  };

  return { setCallback, clearCallback };
};