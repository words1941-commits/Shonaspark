const CACHE_NAME = 'shonaspark-cache-v1';
const urlsToCache = [
  '/Shonaspark/',
  '/Shonaspark/index.html',
  '/Shonaspark/manifest.json',
  '/Shonaspark/icons/icon-192.png',
  '/Shonaspark/icons/icon-512.png',
  '/Shonaspark/style.css'
  // Add JS files here if you have any
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching Shona Spark files');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
