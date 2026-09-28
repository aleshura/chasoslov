// Этот адрес больше не приложение, а заглушка со ссылкой на новый адрес
// (https://clrussia.github.io/chasoslov/). Service worker один раз снимает сам
// себя и чистит старый кэш, чтобы у установивших приложение открылась заглушка.
self.addEventListener('install', function (event) {
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll(); })
      .then(function (clients) {
        clients.forEach(function (client) { client.navigate(client.url); });
      })
  );
});
