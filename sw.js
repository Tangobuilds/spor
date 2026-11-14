// Spor offline-motor – version 202611142157
const V='spor-202611142157',CORE=["./", "index.html", "manifest.webmanifest", "fonts/fonts.css", "lib/d3.min.js", "lib/topojson.min.js", "lib/exifr.umd.js", "lib/jszip.min.js", "lib/html2canvas.min.js", "fonts/newsreader-latin-ext-wght-italic.woff2", "fonts/figtree-latin-ext-wght-normal.woff2", "fonts/figtree-latin-wght-normal.woff2", "fonts/newsreader-latin-ext-wght-normal.woff2", "fonts/newsreader-latin-wght-normal.woff2", "fonts/newsreader-latin-wght-italic.woff2", "icons/icon-1024.png", "icons/maskable-512.png", "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png", "data/w10.json", "data/admin1.json"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k.startsWith('spor-')).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  if(r.mode==='navigate'){e.respondWith(caches.match('index.html').then(c=>{const net=fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(V).then(ca=>ca.put('index.html',cp))}return res}).catch(()=>c);return c||net}));return}
  e.respondWith(caches.match(r).then(c=>c||fetch(r).then(res=>{if(res.ok&&(u.pathname.includes('/tiles/')||u.pathname.includes('/data/')||u.pathname.includes('/lib/')||u.pathname.includes('/fonts/'))){const cp=res.clone();caches.open(V).then(ca=>ca.put(r,cp))}return res})))
});
