// service-worker.js

// CACHE_NAME - შეცვალეთ ეს სახელი ყოველ ჯერზე, როდესაც განახლებას მოახდენთ აპლიკაციაში,
// რათა ახალი Service Worker დაინსტალირდეს და ახალი ფაილები ჩაიტვირთოს მომხმარებლისთვის.
const CACHE_NAME = 'my-pwa-test-cache-v1.0.1'; // ვერსიის ნომერი გავზარდეთ

// urlsToCache - ყველა ის ფაილი, რომლის ქეშირებაც გვინდა ოფლაინ მუშაობისთვის
const urlsToCache = [
    '/', // მთავარი გვერდი
    '/index.html',
    '/style.css',
    '/script.js',
    '/images/icon-192x192.png',
    '/images/icon-512x512.png'
    // თუ სხვა სურათები ან შრიფტები გექნებათ, აქ დაამატეთ მათი გზები
];

// Service Worker-ის ინსტალაციის ეტაპი
self.addEventListener('install', event => {
    console.log('Service Worker: ინსტალაცია...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: ქეში გახსნილია, ფაილები ემატება.');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Service Worker: ქეშირების შეცდომა ინსტალაციისას:', error);
            })
    );
});

// Service Worker-ის fetch (მოთხოვნების გადაჭრა) ეტაპი
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request) // ვამოწმებთ, არის თუ არა მოთხოვნილი რესურსი ქეშში
            .then(response => {
                // თუ რესურსი ნაპოვნია ქეშში, მას ვუბრუნებთ
                if (response) {
                    console.log('Service Worker: რესურსი ნაპოვნია ქეშში:', event.request.url);
                    return response;
                }
                // თუ არ არის ქეშში, მივმართავთ ქსელს
                console.log('Service Worker: რესურსი არ არის ქეშში, ვიღებთ ქსელიდან:', event.request.url);
                return fetch(event.request);
            })
            .catch(error => {
                console.error('Service Worker: fetch შეცდომა:', error);
                // აქ შეგიძლიათ დააბრუნოთ ოფლაინ გვერდი, თუ ქსელი არ არის ხელმისაწვდომი
                // მაგალითად: return caches.match('/offline.html');
            })
    );
});

// Service Worker-ის გააქტიურების ეტაპი
// ამ ეტაპზე ვშლით ძველ ქეშებს, რათა ყოველთვის უახლესი ვერსია გვქონდეს
self.addEventListener('activate', event => {
    console.log('Service Worker: გააქტიურება...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: წაშლილია ძველი ქეში:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
