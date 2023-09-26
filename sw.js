self.addEventListener("fetch", event => {
    // This is a dummy event listener
    // just to pass the PWA installation criteria on
    // some browsers
  });
  
  const urlsToCache = ["/", "sw.js", "main.css", "./assets", "./songs", "index.html", "app.webmanifest"];
  self.addEventListener("install", event => {
     event.waitUntil(
        caches.open("pwa-assets")
        .then(cache => {
           return cache.addAll(urlsToCache);
        })
     );
  });