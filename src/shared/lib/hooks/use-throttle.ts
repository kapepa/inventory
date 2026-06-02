"use client"

import { useRef, useCallback } from 'react'

export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) => {
  const lastRun = useRef<number>(0);
  const timeout = useRef<NodeJS.Timeout | null>(null)

  return useCallback((...args: Parameters<T>) => {
    const now = Date.now()
    const timeSinceLastRun = now - lastRun.current

    if (timeSinceLastRun >= delay) {
      lastRun.current = now
      callback(...args)
    } else {
      if (timeout.current) clearTimeout(timeout.current)
      timeout.current = setTimeout(() => {
        lastRun.current = Date.now()
        callback(...args)
      }, delay - timeSinceLastRun)
    }
  }, [callback, delay])
}