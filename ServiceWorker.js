// Chrome's currently missing some useful cache methods,
// this polyfill adds them.
//importScripts('serviceworker-cache-polyfill.js');

// Here comes the install event!
// This only happens once, when the browser sees this
// version of the ServiceWorker for the first time.
self.addEventListener('install', function(event) {
  // We pass a promise to event.waitUntil to signal how 
  // long install takes, and if it failed
  event.waitUntil(
    // We open a cache…
    caches.open('simple-sw-v1').then(function(cache) {
      // And add resources to it
      return cache.addAll([
        '/',
        '/assets/css/bootstrap.min.css',
        '/assets/css/custom.min.css',
        '/assets/css/sweetalert2.min.css',
        '/assets/js/bootstrap.min.js',
        '/assets/js/custom.js',
        '/assets/js/handlebars-v4.1.2.js',
        '/assets/js/jquery.min.js',
        '/assets/js/main.js',
        '/assets/js/popper.min.js',
        '/assets/js/sweetalert2.min.js',
        '/templates/agregar.js',
        '/templates/listar.js'
      ]);
    })
  );
});

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('simple-sw-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/assets/css/bootstrap.min.css',
        '/assets/css/custom.min.css',
        '/assets/css/sweetalert2.min.css',
        '/assets/js/bootstrap.min.js',
        '/assets/js/custom.js',
        '/assets/js/handlebars-v4.1.2.js',
        '/assets/js/jquery.min.js',
        '/assets/js/main.js',
        '/assets/js/popper.min.js',
        '/assets/js/sweetalert2.min.js',
        '/templates/agregar.js',
        '/templates/listar.js'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
          if(cacheName !== 'simple-sw-v1'){return true}
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

//Eventos posibles: install, activate, message, fetch, sync, push
//install

self.addEventListener('sync', function(event){
  if(event.tag === 'recordatoriosPost'){
    event.waitUntil(
      new Promise((resolve, reject)=>{
        fetch('https://jsonplaceholder.typicode.com/posts').then((result)=>{          
          resolve();
        })
        .catch(()=>{
          reject();
        });
      })
      //promesa a repetirse hasta que de true
      //una vez que da true, se vuelve a registrar un evento sync "sincronizar"
    );  
  }
});

self.addEventListener('push', function(event) {
  //console.log('[Service Worker] Push Received.');
  //console.log(event.data);
  const title = '¡Memorex te avisa!';
  const options = {
    body: 'Buscar pasajes, ¡Hot sale!',
    icon: 'assets/img/apple-icon-60x60.png',
    badge: 'assets/img/apple-icon-60x60.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// The fetch event happens for the page request with the
// ServiceWorker's scope, and any request made within that
// page
self.addEventListener('fetch', function(event) {
  event.respondWith(
    // First we look for something in the caches that
    // matches the request
    caches.match(event.request).then(function(response) {
      // If we get something, we return it, otherwise
      // it's null, and we'll pass the request to
      // fetch, which will use the network.
      return response || fetch(event.request);
    })
  );
});



