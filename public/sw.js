// Service Worker для offline поддержки
const CACHE_VERSION = 'v1';
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const PAGES_CACHE = `pages-${CACHE_VERSION}`;
const IMAGES_CACHE = `images-${CACHE_VERSION}`;

// Критические ресурсы для прекеширования
const PRECACHE_URLS = [
  '/en/offline',
  '/ru/offline',
  '/manifest.en.json',
  '/manifest.ru.json',
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    // Не прекешируем ничего при установке - будем кешировать на лету
    Promise.resolve()
  );
  self.skipWaiting();
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(cacheName => !cacheName.endsWith(CACHE_VERSION))
          .map(cacheName => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  self.clients.claim();
});

// Fetch обработка
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 1. HTML страницы (навигация) - Network First с fallback на кеш
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Кешируем успешный ответ
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(PAGES_CACHE).then(cache => {
              cache.put(request, responseClone);
            });

            // ВАЖНО: При первой успешной загрузке - кешируем offline страницу
            const locale = url.pathname.startsWith('/ru') ? 'ru' : 'en';
            const offlineUrl = `/${locale}/offline`;
            fetch(offlineUrl).then(offlineResponse => {
              if (offlineResponse.ok) {
                caches.open(PAGES_CACHE).then(cache => {
                  cache.put(offlineUrl, offlineResponse);
                  console.log('[SW] Cached offline page:', offlineUrl);
                });
              }
            }).catch(() => {});
          }
          return response;
        })
        .catch(() => {
          // Сначала пробуем взять страницу из кеша
          return caches.match(request).then(cachedPage => {
            if (cachedPage) {
              console.log('[SW] Serving cached page:', url.pathname);
              return cachedPage;
            }

            // Если страницы нет в кеше - пробуем взять offline страницу
            console.log('[SW] Page not cached, trying offline page');
            const locale = url.pathname.startsWith('/ru') ? 'ru' : 'en';
            const offlineUrl = `/${locale}/offline`;

            return caches.match(offlineUrl).then(offlinePage => {
              if (offlinePage) {
                console.log('[SW] Serving offline page');
                return offlinePage;
              }

              // Последний fallback - простой HTML
              console.log('[SW] No offline page in cache, serving fallback HTML');
              return new Response(
                `<!DOCTYPE html>
                <html lang="${locale}">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>${locale === 'ru' ? 'Вы офлайн' : 'You\'re Offline'}</title>
                  <style>
                    body {
                      font-family: system-ui, -apple-system, sans-serif;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      min-height: 100vh;
                      margin: 0;
                      background: #f5f5f5;
                    }
                    .container {
                      text-align: center;
                      padding: 2rem;
                      max-width: 400px;
                      background: white;
                      border-radius: 8px;
                      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    h1 { color: #333; margin-bottom: 1rem; }
                    p { color: #666; margin-bottom: 1.5rem; }
                    button {
                      padding: 0.75rem 1.5rem;
                      background: #000;
                      color: white;
                      border: none;
                      border-radius: 6px;
                      cursor: pointer;
                      font-size: 1rem;
                    }
                    button:hover { background: #333; }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <h1>${locale === 'ru' ? 'Вы офлайн' : 'You\'re Offline'}</h1>
                    <p>${locale === 'ru'
                      ? 'Похоже, что вы потеряли подключение к интернету.'
                      : 'It looks like you\'ve lost your internet connection.'}</p>
                    <button onclick="window.history.back()">${locale === 'ru' ? 'Назад' : 'Go Back'}</button>
                  </div>
                </body>
                </html>`,
                {
                  status: 200,
                  headers: { 'Content-Type': 'text/html; charset=utf-8' }
                }
              );
            });
          });
        })
    );
    return;
  }

  // 2. API запросы - Network Only (не кешируем данные)
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(request));
    return;
  }

  // 3. Cloudinary изображения - Cache First
  if (url.hostname === 'res.cloudinary.com') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) {
          console.log('[SW] Serving cached image:', url.pathname);
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

  // 4. Next.js статика (_next/static) - Cache First (агрессивное кеширование)
  if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/_next/')) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) {
          console.log('[SW] Serving cached Next.js asset:', url.pathname);
          return cached;
        }

        return fetch(request).then(response => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(request, responseClone);
              console.log('[SW] Cached Next.js asset:', url.pathname);
            });
          }
          return response;
        }).catch(() => {
          // Если не можем загрузить - возвращаем пустой ответ вместо ошибки
          console.log('[SW] Failed to load Next.js asset:', url.pathname);
          return new Response('', { status: 200 });
        });
      })
    );
    return;
  }

  // 5. Шрифты - Cache First
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

  // 6. JS, CSS - Cache First с обновлением
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

  // 7. Всё остальное - сеть с fallback на кеш
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
      .catch(() => caches.match(request))
  );
});
