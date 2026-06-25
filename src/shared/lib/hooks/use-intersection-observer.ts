"use client"

import { useInView } from "react-intersection-observer"

interface UseIntersectionObserverOptions {
  threshold?: number
  root?: Element | null
  rootMargin?: string
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const { threshold = 0, root = null, rootMargin = "0px" } = options

  const { ref, inView } = useInView({
    threshold,
    root,
    rootMargin,
  })

  return { targetRef: ref, isIntersecting: inView }
}