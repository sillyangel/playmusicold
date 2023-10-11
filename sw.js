self.addEventListener("fetch", event => {
    
});

  
  const urlsToCache = ["sw.js", "main.css", "index.html", "app.webmanifest", "main.js", "firebase/firebase.js", "moblie.css", "moblie.html"];
  self.addEventListener("install", event => {
     event.waitUntil(
        caches.open("pwa-assets")
        .then(cache => {
           return cache.addAll(urlsToCache);
        })
     );
  });