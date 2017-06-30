var cacheName = 'app-cache-v1';
// 预缓存的资源
var filesToCache = [
    '/',
    '/latest',
    '/css/style.css',
    '/images/book.jpg',
    '/images/home.svg',
    '/images/ic_refresh_white_24px.svg',
    '/images/push-on.png',
    '/images/push-off.png',
    '/js/app.js',
    '/js/menu.js',
    '/js/offline.js',
    '/js/latest.js',
    '/js/toast.js'
];
// 安装service worker
self.addEventListener('install', event => {
    console.log('Service Worker: installing...');
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('Service Worker: App Shell缓存中……');
            return cache.addAll(filesToCache)
        })
    )
});
// 处理service worker 激活
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating....');
    event.waitUntil(
        caches.keys().then(cacheNames => 
            Promise.all(cacheNames.map(key => {
                if (key !== cacheName) {
                    console.log('Service Worker: removing old cache', key)
                    return caches.delete(key)
                }
            }))
        ).then(() => {
            console.log('Service Worker: all old caches have been removed.')
        })
    )
});

// 处理service worker 请求拦截
self.addEventListener('fetch', function(event) {
  console.log('Service Worker: Fetch', event.request.url);
  event.respondWith(
    caches.open(cacheName).then(function(cache) {
      return cache.match(event.request).then(response => {
        return response || fetch(event.request).then(response => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});