const CACHE_NAME = 'otakuhub-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/OtakuHub Graffiti Samurai Logo.png',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
}); 