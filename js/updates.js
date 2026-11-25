/* Offline install, background update check, medical-change review, and the Updates screen.
   Nothing is switched silently: a new version is downloaded and verified into a staging cache,
   then installed only when the user taps apply (after reviewing any medical card changes). */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const CFG = window.SHTF_CONFIG || {};
  const SCOPE = new URL("./", location.href).href;
  const HOST = new URL(CFG.hostUrl || "./", location.href).href;
  const DONE_KEY = SCOPE + "__complete__";
  const hasSW = "serviceWorker" in navigator && "caches" in window;

  const st = {
    active: null,      // version.json of the running offline copy
    ready: false,      // every file of that version is cached
    saving: null,      // { done, total } while the first install runs
    pending: null,     // { manifest, changes } staged and verified, waiting for a tap
    checkFailed: false,
    lastCheck: localStorage.getItem("shtf-last-check") || ""
  };

  function fmtDate(iso) {
    if (!iso) return "";
    const d = new Date(iso.length === 10 ? iso + "T12:00:00" : iso);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  }

  function fmtBytes(n) {
    if (n == null) return "";
    const u = ["B", "KB", "MB", "GB", "TB"];
    let i = 0;
    while (n >= 1024 && i < u.length - 1) { n /= 1024; i++; }
    return (i >= 3 ? n.toFixed(1) : Math.round(n)) + " " + u[i];
  }

  async function sha256(buf) {
    const d = await crypto.subtle.digest("SHA-256", buf);
    return Array.from(new Uint8Array(d), (b) => b.toString(16).padStart(2, "0")).join("");
  }

  async function getJSON(url) {
    const r = await fetch(url + (url.includes("?") ? "&" : "?") + "fresh=" + Date.now(), { cache: "no-store" });
    if (!r.ok) throw new Error(url + " HTTP " + r.status);
    return r.json();
  }

  function activeVersion(reg) {
    const w = reg && (reg.active || reg.waiting || reg.installing);
    return w ? new URL(w.scriptURL).searchParams.get("v") : null;
  }

  // ---------- offline copy ----------

  async function loadActive(version) {
    if (!version || !(await caches.has("shtf-" + version))) return null;
    const cache = await caches.open("shtf-" + version);
    const m = await cache.match(SCOPE + "version.json");
    if (!m || !(await cache.match(DONE_KEY))) return null;
    const manifest = await m.json();
    const have = new Set((await cache.keys()).map((r) => r.url));
    st.ready = manifest.files.every((f) => have.has(SCOPE + f.path));
    return manifest;
  }

  async function start() {
    if (!hasSW) { paint(); return; }
    navigator.serviceWorker.addEventListener("message", (e) => {
      if (e.data && e.data.type === "sw-progress") { st.saving = e.data; paint(); }
    });
    let reg = await navigator.serviceWorker.getRegistration();
    if (!reg || !activeVersion(reg)) {
      // First visit: install the copy this page came from.
      try {
        const local = await getJSON(SCOPE + "version.json");
        st.saving = { done: 0, total: local.files.length };
        paint();
        reg = await navigator.serviceWorker.register("sw.js?v=" + local.version, { updateViaCache: "none" });
        const w = reg.installing;
        if (w) w.addEventListener("statechange", () => { if (w.state === "redundant") { st.saving = null; paint(); } });
      } catch (_) { st.saving = null; paint(); return; }
    }
    await navigator.serviceWorker.ready;
    reg = await navigator.serviceWorker.getRegistration();
    st.active = await loadActive(activeVersion(reg));
    st.saving = null;
    if (st.active && !st.lastCheck) st.lastCheck = st.active.date;
    paint();
    if (navigator.onLine) checkForUpdate();
    window.addEventListener("online", () => checkForUpdate());
  }

  // ---------- background update ----------

  async function checkForUpdate() {
    if (!st.active || st.pending) return;
    let remote;
    try {
      remote = await getJSON(HOST + (CFG.versionFile || "version.json"));
    } catch (_) { return; } // offline or host down: keep quiet, keep the old copy
    if (remote.version === st.active.version || remote.built <= st.active.built) {
      st.lastCheck = new Date().toISOString();
      st.checkFailed = false;
      try { localStorage.setItem("shtf-last-check", st.lastCheck); } catch (_) {}
      paint();
      return;
    }
    try {
      await stage(remote);
      st.pending = { manifest: remote, changes: await medicalChanges(remote) };
      st.checkFailed = false;
    } catch (_) {
      st.checkFailed = true;
    }
    paint();
  }

  // Download every file of the new version into its own staging cache and verify each one.
  // A file that is unchanged is copied from the running copy instead of downloaded.
  async function stage(remote) {
    const name = "shtf-staging-" + remote.version;
    if (await caches.has(name)) {
      const c = await caches.open(name);
      if (await c.match(DONE_KEY)) return;
      await caches.delete(name);
    }
    const staging = await caches.open(name);
    const current = await caches.open("shtf-" + st.active.version);
    const known = new Map(st.active.files.map((f) => [f.path, f.sha256]));
    try {
      for (const f of remote.files) {
        let res = known.get(f.path) === f.sha256 ? await current.match(SCOPE + f.path) : null;
        if (!res) res = await fetch(HOST + f.path + "?fresh=" + remote.version, { cache: "no-store" });
        if (!res.ok) throw new Error("HTTP " + res.status + " " + f.path);
        const buf = await res.arrayBuffer();
        if (buf.byteLength !== f.bytes || (await sha256(buf)) !== f.sha256) throw new Error("hash " + f.path);
        const type = res.headers.get("content-type");
        await staging.put(SCOPE + f.path, new Response(buf, { headers: type ? { "content-type": type } : {} }));
      }
      await staging.put(SCOPE + "version.json", new Response(JSON.stringify(remote), { headers: { "content-type": "application/json" } }));
      await staging.put(DONE_KEY, new Response(remote.version));
    } catch (err) {
      await caches.delete(name);
      throw err;
    }
  }

  // ---------- medical review ----------

  async function libraryFrom(cacheName) {
    const cache = await caches.open(cacheName);
    const win = {};
    for (const f of ["js/drawings.js", "js/drawings-detailed.js", "js/library.js"]) {
      const r = await cache.match(SCOPE + f);
      if (r) new Function("window", await r.text())(win);
    }
    return win;
  }

  async function medicalChanges(remote) {
    const before = st.active.medical || {};
    const after = remote.medical || {};
    const ids = new Set([...Object.keys(before), ...Object.keys(after)]);
    const changed = [...ids].filter((id) => (before[id] || {}).sha256 !== (after[id] || {}).sha256);
    if (!changed.length) return [];
    const oldWin = await libraryFrom("shtf-" + st.active.version);
    const newWin = await libraryFrom("shtf-staging-" + remote.version);
    return changed.map((id) => ({
      id,
      title: (after[id] || before[id]).title,
      old: oldWin.LIBRARY && oldWin.LIBRARY.cards.find((c) => c.id === id),
      neu: newWin.LIBRARY && newWin.LIBRARY.cards.find((c) => c.id === id),
      oldArt: oldWin.DRAWINGS || {},
      newArt: newWin.DRAWINGS || {}
    }));
  }

  function cardLines(card, art) {
    if (!card) return [];
    const lines = card.steps.map((s, i) => ({ key: "s" + i, label: "Step " + (i + 1), text: s.text + (s.caption ? " (" + s.caption + ")" : ""), pic: s.drawing ? art[s.drawing] || "" : "" }));
    Object.entries(card.sizes || {}).forEach(([k, z]) => lines.push({ key: "z" + k, label: k[0].toUpperCase() + k.slice(1) + " size", text: [z.step1Text, z.step1Caption, z.step2Caption].filter(Boolean).join(" "), pic: z.drawing ? art[z.drawing] || "" : "" }));
    card.stopIf.forEach((t, i) => lines.push({ key: "g" + i, label: "Get help fast", text: t, pic: "" }));
    return lines;
  }

  function openReview() {
    const p = st.pending;
    const main = $("#app");
    main.innerHTML = "";
    const wrap = document.createElement("section");
    wrap.className = "updates";
    wrap.innerHTML = '<h1>Review medical changes</h1><p class="upd-lead">This update changes the cards below. Read each change before you apply it. Old wording is crossed out; new wording is underlined.</p>';
    for (const ch of p.changes) {
      const box = document.createElement("div");
      box.className = "review-card";
      box.innerHTML = "<h2>" + esc(ch.title) + (ch.old ? (ch.neu ? "" : " (removed)") : " (new card)") + "</h2>";
      const a = new Map(cardLines(ch.old, ch.oldArt).map((l) => [l.key, l]));
      const b = new Map(cardLines(ch.neu, ch.newArt).map((l) => [l.key, l]));
      let shown = 0;
      for (const key of new Set([...a.keys(), ...b.keys()])) {
        const o = a.get(key), n = b.get(key);
        const textChanged = (o && o.text) !== (n && n.text);
        const picChanged = (o && o.pic) !== (n && n.pic);
        if (!textChanged && !picChanged) continue;
        shown++;
        const row = document.createElement("div");
        row.className = "review-row";
        row.innerHTML = "<strong>" + esc((n || o).label) + "</strong>" +
          (textChanged ? (o ? "<del>" + esc(o.text) + "</del>" : "") + (n ? "<ins>" + esc(n.text) + "</ins>" : "") : "") +
          (picChanged ? '<div class="review-pics"><figure>' + (o ? o.pic : "") + '<figcaption>Old picture</figcaption></figure><figure>' + (n ? n.pic : "") + "<figcaption>New picture</figcaption></figure></div>" : "");
        box.appendChild(row);
      }
      if (!shown) box.insertAdjacentHTML("beforeend", "<p>Source details changed (no step wording or picture change).</p>");
      wrap.appendChild(box);
    }
    const ack = document.createElement("label");
    ack.className = "review-ack";
    ack.innerHTML = '<input type="checkbox" id="review-ok"> I read every change above.';
    wrap.appendChild(ack);
    const row = document.createElement("div");
    row.className = "upd-actions";
    const apply = button("Apply update", "upd-primary", () => applyUpdate(true));
    apply.disabled = true;
    const later = button("Not now", "", () => window.SHTF.home());
    row.append(apply, later);
    wrap.appendChild(row);
    main.appendChild(wrap);
    $("#review-ok").addEventListener("change", (e) => { apply.disabled = !e.target.checked; });
  }

  async function applyUpdate(reviewed) {
    const p = st.pending;
    if (!p) return;
    if (p.changes.length && !reviewed) { openReview(); return; }
    if (p.changes.length) {
      try {
        const log = JSON.parse(localStorage.getItem("shtf-medical-reviews") || "[]");
        log.push({ version: p.manifest.version, cards: p.changes.map((c) => c.id), at: new Date().toISOString() });
        localStorage.setItem("shtf-medical-reviews", JSON.stringify(log.slice(-20)));
      } catch (_) {}
    }
    const status = $("#app-status-text");
    if (status) status.textContent = "Applying update…";
    navigator.serviceWorker.addEventListener("controllerchange", () => location.reload(), { once: true });
    try {
      const reg = await navigator.serviceWorker.register("sw.js?v=" + p.manifest.version, { updateViaCache: "none" });
      const w = reg.installing || reg.waiting;
      if (w) w.addEventListener("statechange", () => {
        if (w.state === "redundant") { st.pending = null; st.checkFailed = true; paint(); }
      });
    } catch (_) {
      st.pending = null;
      st.checkFailed = true;
      paint();
    }
  }

  // ---------- home status line ----------

  function statusText() {
    if (!hasSW) return { text: "This browser cannot save the app for offline use.", tap: false };
    if (st.pending) return { text: "Update ready, tap to apply", tap: true };
    if (st.saving) return { text: "Saving for offline…" + (st.saving.total ? " " + st.saving.done + " of " + st.saving.total : ""), tap: false };
    if (!st.active) return { text: "Not saved for offline yet.", tap: false };
    return { text: "Up to date as of " + fmtDate(st.lastCheck || st.active.date) + (st.checkFailed ? ". Update download failed, will try again." : ""), tap: false };
  }

  function renderHomeStatus(main) {
    const bar = document.createElement("div");
    bar.className = "app-status";
    bar.id = "app-status";
    main.appendChild(bar);
    paint();
  }

  function paint() {
    const bar = $("#app-status");
    if (bar) {
      const s = statusText();
      bar.innerHTML = "";
      const t = document.createElement(s.tap ? "button" : "span");
      t.id = "app-status-text";
      t.className = "status-text" + (s.tap ? " is-tap" : "");
      t.textContent = s.text;
      if (s.tap) { t.type = "button"; t.addEventListener("click", () => applyUpdate(false)); }
      bar.appendChild(t);
      if (st.pending && st.pending.changes.length) {
        const flag = document.createElement("span");
        flag.className = "medical-flag";
        flag.textContent = "Medical cards changed: review first";
        bar.appendChild(flag);
      }
      bar.appendChild(button("Updates", "status-link", openUpdates));
    }
    paintTopBadge();
    const u = $("#upd-app");
    if (u) paintAppBox(u);
  }

  // Ready offline badge lives in the top bar, next to Night and Dim, on every screen.
  function paintTopBadge() {
    const acts = $(".top-actions");
    if (!acts) return;
    let badge = $("#top-offline");
    if (!st.ready) { if (badge) badge.remove(); return; }
    if (!badge) {
      badge = document.createElement("span");
      badge.id = "top-offline";
      badge.className = "offline-badge";
      badge.textContent = "Ready offline ✓";
      acts.insertBefore(badge, acts.firstChild);
    }
  }

  // ---------- Updates screen ----------

  function button(label, cls, fn) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "hit " + cls;
    b.textContent = label;
    b.addEventListener("click", fn);
    return b;
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  function paintAppBox(box) {
    const s = statusText();
    box.innerHTML = "<h2>This app</h2>" +
      '<p class="upd-line">' + (st.ready ? '<span class="offline-badge">Ready offline ✓</span> ' : "") + esc(s.text) + "</p>" +
      (st.active ? '<p class="upd-meta">Version ' + esc(st.active.version) + ", built " + esc(fmtDate(st.active.date)) + ", " + st.active.files.length + " files</p>" : "");
    if (st.pending) box.appendChild(button(st.pending.changes.length ? "Review and apply" : "Apply update", "upd-primary", () => applyUpdate(false)));
  }

  function openUpdates() {
    if (window.SHTF && window.SHTF.state) window.SHTF.state.view = "updates";
    const main = $("#app");
    main.innerHTML = "";
    const wrap = document.createElement("section");
    wrap.className = "updates";
    wrap.innerHTML = "<h1>Updates</h1>";
    const appBox = document.createElement("div");
    appBox.className = "upd-box";
    appBox.id = "upd-app";
    wrap.appendChild(appBox);
    paintAppBox(appBox);

    const src = document.createElement("div");
    src.className = "upd-box";
    src.innerHTML = '<h2>Big downloads and local notices</h2><p class="upd-lead">Newest versions and sizes of the library files, and heat, boil-water and cooling-center notices for Phoenix and Carson City. This needs the internet. Nothing downloads by itself.</p>';
    const check = button("Check now", "upd-primary", () => checkSources(out, check));
    const out = document.createElement("div");
    out.className = "upd-sources";
    src.append(check, out);
    wrap.appendChild(src);
    main.appendChild(wrap);
    const offline = () => {
      check.disabled = !navigator.onLine;
      if (!navigator.onLine) out.innerHTML = '<p class="upd-offline">No internet right now. Updates need the internet. Everything else in the app works offline.</p>';
    };
    offline();
    window.addEventListener("offline", offline);
    window.addEventListener("online", () => { check.disabled = false; out.innerHTML = ""; });
  }

  async function checkSources(out, btn) {
    btn.disabled = true;
    out.innerHTML = '<p class="upd-lead">Checking…</p>';
    let doc;
    try {
      doc = await getJSON(HOST + (CFG.sourcesFile || "sources.json"));
    } catch (_) {
      out.innerHTML = '<p class="upd-offline">Could not reach the update list. Check the internet and try again. Everything else in the app works offline.</p>';
      btn.disabled = false;
      return;
    }
    btn.disabled = false;
    let html = '<p class="upd-meta">List made ' + esc(fmtDate(doc.generated)) + " " + esc(new Date(doc.generated).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })) + "</p>";
    html += '<table class="src-table"><colgroup><col class="c-name"><col class="c-date"><col class="c-size"><col class="c-open"></colgroup>' +
      "<thead><tr><th>Name</th><th>Date</th><th>Size</th><th></th></tr></thead>";
    for (const s of doc.sections || []) {
      html += '<tbody><tr class="src-head"><th colspan="4">' + esc(s.title) +
        (s.status === "ok" ? "" : ' <span class="src-warn">' + (s.status === "stale" ? "old data, source down" : "some items could not be checked") + "</span>") + "</th></tr>";
      for (const it of s.items || []) {
        const ver = it.status === "active" ? "ACTIVE" + (it.until ? " until " + fmtDate(it.until) : "") :
          it.status === "none" ? "None active" : it.status === "error" ? "Could not check" : (fmtDate(it.date) || it.version || "");
        html += "<tr><td>" + esc(it.title) + (it.note && it.status !== "none" ? '<span class="src-note">' + esc(it.note) + "</span>" : "") + "</td>" +
          '<td class="src-ver' + (it.status === "active" ? " is-alert" : "") + '">' + esc(ver) + "</td>" +
          '<td class="src-size">' + esc(fmtBytes(it.bytes)) + "</td>" +
          "<td>" + (it.url ? '<a href="' + esc(it.url) + '" target="_blank" rel="noopener">Open</a>' : "") + "</td></tr>";
      }
      html += "</tbody>";
    }
    html += "</table>";
    out.innerHTML = html;
  }

  window.SHTF_UPDATES = { start, renderHomeStatus, openUpdates, checkForUpdate, state: st };
  document.addEventListener("DOMContentLoaded", start);
})();
