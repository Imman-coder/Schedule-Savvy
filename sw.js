self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fox-store').then((cache) => cache.addAll([
      '/',
      '/index.html',
      '/script/db.js',
      '/script/contextMenu.js',
      '/script/popupMenu.js',
      '/script/topNavBar.js',
      '/script/propertyMenu.js',
      '/script/utils/utils.js',
      '/script/utils/BackupHandler.js',
      '/script/utils/canvasPrinter.js',
      '/script/utils/LocalStorageHandler.js',
      '/script/utils/preference.js',
      '/script/TableHandling/Table.js',
      '/script/TableHandling/tableEventHandler.js',
      '/styles/style.css',
      '/icon/task-list.png',
      '/manifest.json',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
//   console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});

