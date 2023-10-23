try {
// Service Worker
const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  './index.html',
  './main.css',
  './main.js',
  './dist/sw.bundle.js',
   './dist/main.bundle.js',
   './app.webmanifest',
   './assets/nonealbum.png',
   './assets/searchicon.png',
   './assets/addplaylist.png'
];

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
} catch(error) {
   alert(error.message);
   alert(error);
   console.log(error);
   console.log(error.message);
}