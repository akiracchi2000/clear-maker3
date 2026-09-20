const APP_VERSION = '3.1.7';
const CACHE_NAME = `clear-maker3-cache-v${APP_VERSION}`;

const LOCAL_ASSETS = [
    './',
    `./index.html?v=${APP_VERSION}`,
    `./style.css?v=${APP_VERSION}`,
    `./app.js?v=${APP_VERSION}`,
    `./manifest.json?v=${APP_VERSION}`,
    './README.md',
    `./icon-192.png?v=${APP_VERSION}`,
    `./icon-512.png?v=${APP_VERSION}`
];

const CDN_ASSETS = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;700&display=swap',
    'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
    'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
    'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js',
    'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js',
    'https://html2canvas.hertzen.com/dist/html2canvas.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js'
];

self.addEventListener('install', (event) => {
    // 【重要】待機中のSWを強制的にスキップして即時有効にする
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(async (cache) => {
                console.log('Opened cache for version', APP_VERSION);
                try {
                    await cache.addAll(LOCAL_ASSETS);
                } catch (err) {
                    console.warn('Local assets cache warning:', err);
                }
                // CDNアセットは個別にキャッシュ（失敗してもSW登録を妨げない）
                for (const url of CDN_ASSETS) {
                    try {
                        const res = await fetch(url, { mode: 'cors' });
                        if (res.ok) await cache.put(url, res);
                    } catch (e) {
                        console.warn('CDN cache skipped:', url);
                    }
                }
            })
    );
});

self.addEventListener('fetch', (event) => {
    // 外部API (Google Apps Script) へのリクエストや、POSTなどの非GETリクエストは
    // Service Workerのキャッシュ対象外としてバイパスし、ブラウザのデフォルト処理に任せる
    if (event.request.method !== 'GET' || event.request.url.includes('script.google.com')) {
        return;
    }

    // Check if the request is for navigation (HTML) or local assets
    const isNavigation = event.request.mode === 'navigate';
    const isLocalAsset = event.request.url.startsWith(self.location.origin);

    // Network First Strategy for HTML and Local Assets
    if (isNavigation || isLocalAsset) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    // Update cache with the new response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                    return response;
                })
                .catch(() => {
                    // Fallback to cache if network fails
                    return caches.match(event.request);
                })
        );
    } else {
        // Cache First Strategy for other assets (e.g., CDN libraries)
        event.respondWith(
            caches.match(event.request)
                .then((response) => {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request).then(
                        (response) => {
                            if (!response || response.status !== 200 || response.type !== 'basic') {
                                return response;
                            }
                            const responseToCache = response.clone();
                            caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });
                            return response;
                        }
                    );
                })
        );
    }
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // 【重要】新しいSWがすぐにページ（クライアント）を制御下に置くようにする
            return self.clients.claim();
        })
    );
});
