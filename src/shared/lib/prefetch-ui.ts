export const prefetchRadixUI = () => {
  if (typeof window === 'undefined') return

  const prefetch = () => {
    // Webpack magic comment для prefetch
    import(
      /* webpackPrefetch: true */
      '@radix-ui/react-tooltip'
    ).catch(() => { })
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(prefetch)
  } else {
    setTimeout(prefetch, 1000)
  }
}