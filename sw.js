
//version

var appVersion = 'v1:06';

//files to cache

var files = [
    './',
    './index.html',
    './attachment.png',
    './attachment2.png',
    './fingerprint.png'
]
//install

self.addEventListener('install', event =>{
    event.waitUntil(
        caches.open(appVersion)
        .then(cache=>{return cache.addAll(files)
        .catch(err =>{console.error('error adding files to cache', err);
    })
        })
)
console.info('sw installed');
self.skipWaiting();
})

//activate
self.addEventListener('activate', event =>{
    event.waitUntil(
        caches.keys()
        .then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache =>{
                    if(cache !== appVersion){
                        console.info('deleting old cache', cache)
                        return caches.delete(cache);
                    }
                })
            )
        })
     )
     return self.clients.claim();
} )
//fetch

self.addEventListener('fetch', event =>{
    console.info('sw fetch', event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then(res=>{
            return res || fetch(event.request);
        })
    )
})