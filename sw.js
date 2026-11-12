const V='today-menu-v1';
const SHELL=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// اول از اینترنت می‌گیره (تا آپدیت‌ها زود برسن)، اگه نبود از حافظه
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||!e.request.url.startsWith('http'))return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(h=>h.put(e.request,c)).catch(()=>{});return r})
    .catch(()=>caches.match(e.request).then(m=>m||caches.match('index.html'))));
});
