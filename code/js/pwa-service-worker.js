"use strict";

const cacheName = "SAKryukov-Named-Color-Table-CSS-WPF";

const initialCachedResources = [
    "/",
    "definitionSet.js",
    "index.html",
    "manifest.json",
    "colors/conversions.js",
    "colors/parsing.js",
    "colors/sorting.js",
    "images/color-table.png",
    "images/color-table.svg",
    "names/css.js",
    "names/wpf.js",
    "ui/elements.js",
    "ui/main.js",
    "ui/sortingOrder.js"
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
