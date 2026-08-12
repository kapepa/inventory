// Service Worker for offline support
const CACHE_VERSION = 'v3';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const PAGES_CACHE = `pages-${CACHE_VERSION}`;
const IMAGES_CACHE = `images-${CACHE_VERSION}`;

// Cache settings
const PAGES_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

// Service Worker installation
self.addEventListener('install', (event) => {
  // Skip pre-caching—the offline page will be cached on the first visit
  self.skipWaiting();
});

// Service Worker activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(cacheName => !cacheName.endsWith(CACHE_VERSION))
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// Fetch handling
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. HTML pages (navigation) - Network First with cache fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            // Always cache a successful response
            const responseClone = response.clone();
            const headers = new Headers(responseClone.headers);
            headers.set('sw-cache-time', Date.now().toString());

            responseClone.blob().then(body => {
              const newResponse = new Response(body, {
                status: responseClone.status,
                statusText: responseClone.statusText,
                headers: headers
              });
              caches.open(PAGES_CACHE).then(cache => {
                cache.put(request, newResponse);
              });
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then(cachedPage => {
            if (cachedPage) {
              return cachedPage;
            }

            const locale = url.pathname.startsWith('/ru') ? 'ru' : 'en';
            const offlineUrl = `/${locale}/offline`;

            return caches.match(offlineUrl);
          }).then(offlinePage => {
            if (offlinePage) {
              return offlinePage;
            }

            const locale = url.pathname.startsWith('/ru') ? 'ru' : 'en';
            return new Response(
              `<h1>${locale === 'ru' ? 'Нет подключения' : 'No connection'}</h1>`,
              { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
            );
          });
        })
    );
    return;
  }

  // 2. API requests - Network Only (do not cache data)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request).catch(() => {
        // The API is not available offline—we return an error without logging anything to the console
        return new Response(
          JSON.stringify({ error: 'No internet connection' }),
          {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
          }
        );
      })
    );
    return;
  }

  if (url.hostname === 'res.cloudinary.com') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) {
          return cached;
        }

        return fetch(request).then(response => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(IMAGES_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/_next/')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) {
          return cached;
        }

        return fetch(request).then(response => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        }).catch(() => {
          return new Response('', { status: 200 });
        });
      })
    );
    return;
  }

  // 5. Fonts - Cache First
  if (/\.(woff|woff2|ttf|otf)$/i.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;

        return fetch(request).then(response => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });
      })
    );
    return;
  }

  // 6. JS, CSS - Cache First with update
  if (/\.(js|css)$/i.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then(cached => {
        const fetchPromise = fetch(request).then(response => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
          }
          return response;
        });

        return cached || fetchPromise;
      })
    );
    return;
  }

  // 7. Everything else - network with cache fallback
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok && request.method === 'GET') {
          const responseClone = response.clone();
          caches.open(STATIC_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(request).then(cached => {
          if (cached) {
            return cached;
          }
          // Return an empty 200 response if nothing is found
          return new Response('', { status: 200 });
        });
      })
  );
});