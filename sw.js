self.addEventListener("fetch", event => {
   event.respondWith(
       // Try to fetch the requested resource from the cache
       caches.match(event.request)
           .then(cachedResponse => {
               // If the resource is found in the cache, return it
               if (cachedResponse) {
                   return cachedResponse;
               }

               // If the resource is not in the cache, fetch it from the network
               return fetch(event.request)
                   .then(response => {
                       // Cache the fetched resource for future use
                       caches.open("pwa-assets")
                           .then(cache => {
                               cache.put(event.request, response.clone());
                           });
                       return response;
                   })
                   .catch(error => {
                       // Handle fetch errors, e.g., fallback to a custom offline page
                       console.error('Fetch failed:', error);
                       // You can return a custom offline page here
                   });
           })
   );
});

  
  const urlsToCache = ["sw.js", "main.css", "index.html", "app.webmanifest", "main.js", "firebas.js", "moblie.css", "moblie.html"];
  self.addEventListener("install", event => {
     event.waitUntil(
        caches.open("pwa-assets")
        .then(cache => {
           return cache.addAll(urlsToCache);
        })
     );
  });