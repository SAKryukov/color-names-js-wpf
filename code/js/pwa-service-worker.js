"use strict";

const cacheName = "SAKryukov-Named-Color-Table-CSS-WPF";

const initialCachedResources = [
    "/",
    "index.html",
    "index.js",
    "manifest.json",
    "playgroundAPI.js",
    "images/JavaScript-Playground.png",
    "images/JavaScript-Playground.svg"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(initialCachedResources);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
