/* Service worker: network-first for app code, cache-first for (immutable) Bible data. Bump VERSION on release. */
const VERSION = 'rstl-v3';
const CODE = VERSION + '-code', DATA = VERSION + '-data';
const SHELF = ['./', 'index.html', 'css/app.css', 'js/app.js', 'js/icons.js', 'js/store.js', 'manifest.webmanifest', 'icons/icon.svg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CODE).then(c => c.addAll(SHELF)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => !k.startsWith(VERSION)).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url); if (url.origin !== location.origin) return;
  const isData = url.pathname.includes('/data/');
  e.respondWith((async () => {
    const cache = await caches.open(isData ? DATA : CODE);
    if (isData) { const hit = await cache.match(req); if (hit) return hit; }
    try { const res = await fetch(req); if (res.ok) cache.put(req, res.clone()); return res; }
    catch (err) { const hit = await cache.match(req) || await caches.match(req); if (hit) return hit; if (req.mode === 'navigate') return (await cache.match('index.html')) || Response.error(); return Response.error(); }
  })());
});
