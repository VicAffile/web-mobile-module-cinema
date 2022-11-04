const vue = ["/", "/index.html"];
const nomCache = "cache-v1";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(nomCache).then((cache) => {
      cache.addAll(vue);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(function (reponse) {
      if (reponse) {
        return reponse;
      }
      let fetchRequest = event.request.clone();
      return fetch(fetchRequest).then(function (reponse) {
        if (!reponse || reponse.status !== 200 || reponse.type !== "basic") {
          return reponse;
        }
        let cacheReponse = reponse.clone();
        caches.open(nomCache).then(function (cache) {
          cache.put(event.request, cacheReponse);
        });
        return reponse;
      });
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.add(
        keys
          .filter((key) => key !== nomCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});
