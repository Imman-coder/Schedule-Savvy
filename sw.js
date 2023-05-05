self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fox-store').then((cache) => cache.addAll([
      '/Schedule-Savvy/',
      '/Schedule-Savvy/index.html',
      '/Schedule-Savvy/script/db.js',
      '/Schedule-Savvy/script/contextMenu.js',
      '/Schedule-Savvy/script/popupMenu.js',
      '/Schedule-Savvy/script/topNavBar.js',
      '/Schedule-Savvy/script/propertyMenu.js',
      '/Schedule-Savvy/script/utils/utils.js',
      '/Schedule-Savvy/script/utils/BackupHandler.js',
      '/Schedule-Savvy/script/utils/canvasPrinter.js',
      '/Schedule-Savvy/script/utils/LocalStorageHandler.js',
      '/Schedule-Savvy/script/utils/preference.js',
      '/Schedule-Savvy/script/TableHandling/Table.js',
      '/Schedule-Savvy/script/TableHandling/tableEventHandler.js',
      '/Schedule-Savvy/styles/style.css',
      '/Schedule-Savvy/icon/task-list.png',
      '/Schedule-Savvy/manifest.json',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
//   console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});

