self.addEventListener("fetch", event => {
    // This is a dummy event listener
    // just to pass the PWA installation criteria on
    // some browsers
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