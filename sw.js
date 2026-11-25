/* Offline service worker. Each app version lives in its own cache ("shtf-<version>").
   A version is installed only when every file in its version.json matches size and SHA-256.
   Any miss or mismatch fails the install and the old version keeps running (all or nothing).
   Updates are staged by the page (js/updates.js) and only installed after the user taps apply. */
const VERSION = new URL(self.location).searchParams.get("v") || "";
const CACHE = "shtf-" + VERSION;
const STAGING = "shtf-staging-" + VERSION;
const SCOPE = new URL("./", self.location).href;
const DONE_KEY = SCOPE + "__complete__";

async function sha256(buf) {
  const d = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(d), (b) => b.toString(16).padStart(2, "0")).join("");
}

async function post(msg) {
  for (const c of await self.clients.matchAll({ includeUncontrolled: true })) c.postMessage(msg);
}

async function readManifest(staged) {
  if (staged) {
    const r = await staged.match(SCOPE + "version.json");
    if (r) return r.json();
  }
  const r = await fetch(SCOPE + "version.json?fresh=" + Date.now(), { cache: "no-store" });
  if (!r.ok) throw new Error("version.json HTTP " + r.status);
  return r.json();
}

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    if (!VERSION) throw new Error("no version");
    const staged = (await caches.has(STAGING)) ? await caches.open(STAGING) : null;
    const fromStaging = !!(staged && await staged.match(DONE_KEY));
    const manifest = await readManifest(fromStaging ? staged : null);
    if (manifest.version !== VERSION) throw new Error("version.json is " + manifest.version + ", expected " + VERSION);

    // Read and verify everything first; nothing is written until all files pass.
    const files = [];
    let n = 0;
    for (const f of manifest.files) {
      const url = SCOPE + f.path;
      const res = fromStaging ? await staged.match(url) : await fetch(url + "?fresh=" + VERSION, { cache: "no-store" });
      if (!res || !res.ok) throw new Error("missing " + f.path);
      const buf = await res.arrayBuffer();
      if (buf.byteLength !== f.bytes || await sha256(buf) !== f.sha256) throw new Error("bad hash " + f.path);
      files.push([url, buf, res.headers.get("content-type") || ""]);
      n += 1;
      if (n % 10 === 0) post({ type: "sw-progress", done: n, total: manifest.files.length });
    }

    await caches.delete(CACHE);
    const cache = await caches.open(CACHE);
    for (const [url, buf, type] of files) {
      await cache.put(url, new Response(buf, { headers: type ? { "content-type": type } : {} }));
    }
    await cache.put(SCOPE + "version.json", new Response(JSON.stringify(manifest), { headers: { "content-type": "application/json" } }));
    await cache.put(DONE_KEY, new Response(VERSION));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) {
      if (key.startsWith("shtf-") && key !== CACHE) await caches.delete(key);
    }
    await self.clients.claim();
    post({ type: "sw-active", version: VERSION });
  })());
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "version") event.source.postMessage({ type: "sw-version", version: VERSION });
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || !req.url.startsWith(SCOPE)) return;
  const url = new URL(req.url);
  // Update checks and staging downloads always go to the network.
  if (url.searchParams.has("fresh") || /\/(version|sources)\.json$/.test(url.pathname)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const key = req.mode === "navigate" && url.href.split(/[?#]/)[0] === SCOPE ? SCOPE + "index.html" : url.origin + url.pathname;
    const hit = await cache.match(key);
    if (hit) return hit;
    try {
      return await fetch(req);
    } catch (err) {
      if (req.mode === "navigate") {
        const shell = await cache.match(SCOPE + "index.html");
        if (shell) return shell;
      }
      throw err;
    }
  })());
});
