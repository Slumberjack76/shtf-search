/* Drive Library: search the SHTF_LIB USB catalog (titles/paths/sizes only). */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);

  const st = {
    q: "",
    topic: "",
    maps: null,   // "AZ" | "NV" | null
    letter: "",
    screen: "list", // list | item
    current: null
  };

  let catalog = null;
  let loadPromise = null;

  const TOPIC_ICON = {
    Medical: "medical",
    Water: "water",
    "Food/Hunting": "food",
    Shelter: "shelter",
    Power: "power",
    Repair: "repair",
    "Survival Manuals": "info",
    Bushcraft: "bushcraft",
    Comms: "comms",
    Maps: "maps",
    Plants: "food",
    Education: "learn",
    "Books/Wikipedia": "wiki",
    "Start here": "info"
  };

  function loadCatalog() {
    if (catalog) return Promise.resolve(catalog);
    if (loadPromise) return loadPromise;
    loadPromise = fetch("data/drive-catalog.json")
      .then((r) => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then((j) => {
        catalog = j;
        return j;
      })
      .catch((err) => {
        loadPromise = null;
        throw err;
      });
    return loadPromise;
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  function norm(s) {
    return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function tokens(q) {
    return norm(q).split(/\s+/).filter((t) => t.length >= 2);
  }

  function fmtSize(mb) {
    if (mb == null || mb === "") return "";
    const n = Number(mb);
    if (!isFinite(n)) return "";
    if (n >= 1024) {
      const gb = n / 1024;
      return (gb >= 10 ? gb.toFixed(0) : gb.toFixed(1)) + " GB";
    }
    if (n >= 1) return (n >= 10 ? String(Math.round(n)) : n.toFixed(1)) + " MB";
    const kb = n * 1024;
    if (kb < 1) return "< 1 KB";
    return Math.round(kb) + " KB";
  }

  function folderHint(p) {
    let parts = String(p || "").replace(/\\/g, "/").split("/").filter(Boolean);
    if (parts.length && /^[a-z]:$/i.test(parts[0])) parts.shift();
    const last = parts[parts.length - 1] || "";
    if (parts.length && /\.[a-z0-9]{1,5}$/i.test(last)) parts.pop();
    return ["SHTF_LIB"].concat(parts).join(" > ");
  }

  function itemIcon(it) {
    if (it.x === "zim" || it.x === "book") return "wiki";
    if (it.x === "map" || it.x === "maps-az" || it.x === "maps-nv") return "maps";
    if (it.x === "app") return "learn";
    return TOPIC_ICON[it.k] || "pdf";
  }

  function hasTopic(it, topic) {
    if (!topic) return true;
    if (it.k === topic) return true;
    return (it.k2 || []).indexOf(topic) >= 0;
  }

  function haystack(it) {
    const ch = (it.ch || []).map((c) => c[0]).join(" ");
    return [it.t, it.src || "", it.w || "", it.p || "", it.k || "", (it.k2 || []).join(" "), ch].join(" ");
  }

  function matchesItem(it, q) {
    const toks = tokens(q);
    if (!toks.length) return true;
    const h = norm(haystack(it));
    return toks.every((t) => h.includes(t));
  }

  function matchesQuadTitle(title, q) {
    const toks = tokens(q);
    if (!toks.length) return false;
    const h = norm(title);
    return toks.every((t) => h.includes(t));
  }

  function highlight(text, q) {
    const words = tokens(q);
    if (!words.length) return escapeHtml(text);
    const re = new RegExp("(" + words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "ig");
    return escapeHtml(text).replace(re, "<mark>$1</mark>");
  }

  function packDir(code, pack) {
    return (pack && pack.d) || ("20_Maps_Topo/US_Topo_Current/" + code);
  }

  function collectionItems() {
    if (!catalog) return [];
    const out = [];
    [["AZ", "Arizona"], ["NV", "Nevada"]].forEach(([code, name]) => {
      const pack = catalog.quads[code];
      if (!pack) return;
      out.push({
        t: name + " topo maps",
        k: "Maps",
        s: pack.s,
        p: packDir(code, pack),
        x: "maps-" + code.toLowerCase(),
        src: "USGS",
        w: name + " " + code + " topo maps usgs quads collection",
        n: pack.n,
        _state: code
      });
    });
    return out;
  }

  function quadItem(stCode, title, size) {
    const pack = catalog.quads[stCode];
    const file = stCode + "_" + title.replace(/ /g, "_") + ".pdf";
    return {
      t: title,
      k: "Maps",
      s: size,
      p: packDir(stCode, pack) + "/" + file,
      x: "pdf",
      src: "USGS",
      w: title + " " + stCode + " topo quad",
      _quad: stCode
    };
  }

  function matchingQuads(q, stCode) {
    if (!catalog) return [];
    const states = stCode ? [stCode] : ["AZ", "NV"];
    const out = [];
    const letter = st.letter;
    states.forEach((code) => {
      const pack = catalog.quads[code];
      if (!pack) return;
      pack.q.forEach(([title, size]) => {
        if (letter && title[0].toUpperCase() !== letter) return;
        if (q && !matchesQuadTitle(title, q)) return;
        if (!q && !letter) return;
        out.push(quadItem(code, title, size));
      });
    });
    return out;
  }

  function listResults() {
    const raw = st.q.trim();
    const q = tokens(raw).length ? raw : "";
    const topic = st.topic;
    const items = catalog.items || [];
    let rows = [];

    if (st.maps) {
      const pack = catalog.quads[st.maps];
      const other = q ? items.filter((it) => hasTopic(it, "Maps") && matchesItem(it, q)) : [];
      const quads = matchingQuads(q, st.maps);
      return { mode: "maps-state", other, quads, pack };
    }

    if (topic === "Maps" && !q) {
      const mapsFiles = items.filter((it) => hasTopic(it, "Maps"));
      return { mode: "maps-home", collections: collectionItems(), files: mapsFiles };
    }

    if (!q && !topic) {
      const start = items.filter((it) => it.k === "Start here");
      return { mode: "home", start };
    }

    rows = items.filter((it) => hasTopic(it, topic) && matchesItem(it, q));
    if (q && (!topic || topic === "Maps")) {
      collectionItems().forEach((it) => {
        if (matchesItem(it, q) && !rows.some((r) => r.p === it.p)) rows.push(it);
      });
    }
    let quads = [];
    if (q && (!topic || topic === "Maps")) quads = matchingQuads(q, null);
    return { mode: "list", rows, quads };
  }

  function remember(it) {
    if (window.SHTF && window.SHTF.remember) {
      SHTF.remember({ id: "drive:" + it.p, title: it.t, type: "pdf" });
    }
  }

  function goHomeChrome() {
    if (window.SHTF && window.SHTF.stopTimers) SHTF.stopTimers();
    if (window.SHTF && window.SHTF.state) SHTF.state.view = "drive";
    const top = $("#topbar");
    if (top) top.classList.remove("is-hidden");
    if (window.SHTF && window.SHTF.renderRecent) SHTF.renderRecent();
  }

  function isZim(it) {
    return it.x === "zim" || /\.zim$/i.test(it.p || "");
  }

  function resultSub(it) {
    const parts = [];
    const src = it.src || (it._quad || it._state ? "USGS" : "");
    if (src) parts.push(src);
    if (it._quad) parts.push(it._quad + " topo");
    const sz = fmtSize(it.s);
    if (sz) parts.push(sz);
    if (it.n) parts.push(it.n + " maps");
    if (it.ch && it.ch.length) parts.push(it.ch.length + " chapters");
    return parts.join(" · ");
  }

  function resultButton(it) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "list-item result";
    const q = st.q;
    const zim = isZim(it);
    const badge = zim ? "Opens in Kiwix" : "Open from drive";
    const badgeCls = zim ? "drive-badge is-kiwix" : "drive-badge";
    b.innerHTML = icon(itemIcon(it), "glyph") +
      '<span class="meta"><span class="title">' + (q ? highlight(it.t, q) : escapeHtml(it.t)) +
      '</span><span class="sub">' + escapeHtml(resultSub(it)) + "</span></span>" +
      '<span class="' + badgeCls + '">' + escapeHtml(badge) + "</span>";
    b.addEventListener("click", () => {
      if (it._state) {
        st.maps = it._state;
        st.letter = "";
        st.screen = "list";
        st.current = null;
        paint();
        return;
      }
      openItem(it);
    });
    return b;
  }

  function openItem(it) {
    st.screen = "item";
    st.current = it;
    remember(it);
    if (window.SHTF && window.SHTF.renderRecent) SHTF.renderRecent();
    paint();
  }

  function howtoBlock(it) {
    const wrap = document.createElement("div");
    wrap.className = "drive-howto";
    const hint = '<p class="drive-folder-hint">' + escapeHtml(folderHint(it.p)) + "</p>";
    let html = "";
    if (it.x === "app") {
      html = "<h2>This app</h2>" + hint +
        "<p>You are already in this Help Library. A copy also sits in the 30_App_Search folder. You do not need to open those files.</p>";
    } else if (it.x === "zim") {
      html = "<h2>How to open this</h2>" + hint +
        "<p>This file opens in the Kiwix app. Leave it on the drive.</p>" +
        "<ol>" +
        "<li>Open the Files app.</li>" +
        "<li>Follow the folders in the line above.</li>" +
        "<li>Tap the .zim file.</li>" +
        "<li>Open it in Kiwix. Choose Open, not Import.</li>" +
        "</ol>";
    } else if (it.x === "book") {
      html = "<h2>How to open this</h2>" + hint +
        "<p>This is one book split into chapter files.</p>" +
        "<ol>" +
        "<li>Open the Files app.</li>" +
        "<li>Follow the folders in the line above.</li>" +
        "<li>Tap a chapter. On iPad you can also open it in Books.</li>" +
        "</ol>";
    } else if (it.x === "map" && /\.pbf$/i.test(it.p || "")) {
      html = "<h2>How to open this</h2>" + hint +
        "<p>This is a map file for an app such as Organic Maps.</p>" +
        "<ol>" +
        "<li>Open the Files app.</li>" +
        "<li>Follow the folders in the line above.</li>" +
        "<li>Tap the file.</li>" +
        "</ol>";
    } else if (it.x === "maps-az" || it.x === "maps-nv") {
      html = "";
    } else {
      html = "<h2>How to open this</h2>" + hint +
        "<p>This file is on the drive, not inside this app.</p>" +
        "<ol>" +
        "<li>Open the Files app.</li>" +
        "<li>Follow the folders in the line above.</li>" +
        "<li>Tap the file. On iPad you can also open a PDF in Books.</li>" +
        "</ol>";
    }
    if (html) wrap.innerHTML = html;
    return wrap;
  }

  function paintItem(main) {
    const it = st.current;
    const back = document.createElement("button");
    back.type = "button";
    back.className = "hit drive-back";
    back.textContent = "Back";
    back.addEventListener("click", () => {
      st.screen = "list";
      st.current = null;
      paint();
    });
    main.appendChild(back);

    const h = document.createElement("p");
    h.className = "section-label";
    h.textContent = it.k + (it.k2 && it.k2.length ? " · " + it.k2.join(" · ") : "");
    main.appendChild(h);

    const title = document.createElement("h1");
    title.className = "drive-title";
    title.textContent = it.t;
    main.appendChild(title);

    const meta = document.createElement("p");
    meta.className = "drive-lead";
    meta.textContent = fmtSize(it.s) + (it.ch ? " · " + it.ch.length + " chapters" : "") + (it.n ? " · " + it.n + " maps" : "");
    main.appendChild(meta);

    main.appendChild(howtoBlock(it));

    if (it.ch && it.ch.length) {
      const lab = document.createElement("p");
      lab.className = "section-label";
      lab.textContent = "Chapters";
      main.appendChild(lab);
      const q = st.q;
      const list = document.createElement("div");
      list.className = "list";
      it.ch.forEach((c) => {
        const ch = { t: c[0], s: c[1], p: it.p + "/" + c[2], x: "pdf", k: it.k, src: it.src, w: c[0] };
        if (q && !matchesItem(ch, q) && !matchesItem(it, q)) return;
        list.appendChild(resultButton(ch));
      });
      if (!list.childNodes.length) {
        it.ch.forEach((c) => {
          const ch = { t: c[0], s: c[1], p: it.p + "/" + c[2], x: "pdf", k: it.k, src: it.src, w: c[0] };
          list.appendChild(resultButton(ch));
        });
      }
      main.appendChild(list);
    }
  }

  function paintChips(host) {
    const row = document.createElement("div");
    row.className = "drive-chips";
    row.setAttribute("role", "tablist");
    row.setAttribute("aria-label", "Drive topics");
    (catalog.topics || []).forEach((name) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "drive-chip" + (st.topic === name ? " is-on" : "");
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", st.topic === name ? "true" : "false");
      b.textContent = name;
      b.addEventListener("click", () => {
        if (st.topic === name) {
          st.topic = "";
          st.maps = null;
          st.letter = "";
        } else {
          st.topic = name;
          st.maps = null;
          st.letter = "";
        }
        st.screen = "list";
        st.current = null;
        paint();
        const box = $("#drive-search");
        if (box) box.focus();
      });
      row.appendChild(b);
    });
    host.appendChild(row);
  }

  function paintSearch(host, placeholder) {
    const wrap = document.createElement("form");
    wrap.className = "drive-search-wrap";
    wrap.setAttribute("role", "search");
    wrap.innerHTML = '<label class="visually-hidden" for="drive-search">Search the library</label>' +
      '<input id="drive-search" type="search" placeholder="' + escapeHtml(placeholder) +
      '" autocomplete="off" enterkeyhint="search" autocapitalize="none" spellcheck="false">';
    wrap.addEventListener("submit", (e) => {
      e.preventDefault();
      st.q = $("#drive-search").value;
      st.screen = "list";
      st.current = null;
      paint();
    });
    host.appendChild(wrap);
    const box = wrap.querySelector("#drive-search");
    box.value = st.q;
    box.addEventListener("input", (e) => {
      st.q = e.target.value;
      if (st.screen !== "list") {
        st.screen = "list";
        st.current = null;
        paint();
        const again = $("#drive-search");
        if (again) {
          const pos = again.value.length;
          try { again.focus(); again.setSelectionRange(pos, pos); } catch (_) {}
        }
        return;
      }
      paintListOnly();
    });
    return box;
  }

  function paintLetters(host, stCode) {
    const pack = catalog.quads[stCode];
    const have = {};
    pack.q.forEach(([title]) => { have[title[0].toUpperCase()] = true; });
    const row = document.createElement("div");
    row.className = "drive-letters";
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((L) => {
      if (!have[L]) return;
      const b = document.createElement("button");
      b.type = "button";
      b.className = "drive-letter" + (st.letter === L ? " is-on" : "");
      b.textContent = L;
      b.addEventListener("click", () => {
        st.letter = st.letter === L ? "" : L;
        paint();
      });
      row.appendChild(b);
    });
    host.appendChild(row);
  }

  function emptyNote(text) {
    const p = document.createElement("p");
    p.className = "empty";
    p.textContent = text;
    return p;
  }

  function plugHint() {
    const p = document.createElement("p");
    p.className = "drive-help-line";
    p.textContent = "Plug in the SSD, then tap Open";
    return p;
  }

  function paintTopicGrid(host) {
    const grid = document.createElement("div");
    grid.className = "cat-grid drive-topic-grid";
    (catalog.topics || []).forEach((name) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "cat-tile";
      b.innerHTML = icon(TOPIC_ICON[name] || "info", "glyph") +
        '<span class="label">' + escapeHtml(name) + "</span>";
      b.addEventListener("click", () => {
        st.topic = name;
        st.maps = null;
        st.letter = "";
        st.screen = "list";
        st.current = null;
        paint();
      });
      grid.appendChild(b);
    });
    host.appendChild(grid);
  }

  function paintList(main) {
    const data = listResults();
    const list = document.createElement("div");
    list.className = "list";
    list.id = "drive-list";

    if (!tokens(st.q).length && !st.maps) main.appendChild(plugHint());

    if (data.mode === "home") {
      paintTopicGrid(main);
      if (data.start.length) {
        const lab = document.createElement("p");
        lab.className = "section-label";
        lab.textContent = "Start here";
        main.appendChild(lab);
        data.start.forEach((it) => list.appendChild(resultButton(it)));
        main.appendChild(list);
      }
      return;
    }

    if (data.mode === "maps-home") {
      const lead = document.createElement("p");
      lead.className = "drive-lead";
      lead.textContent = "Type a place name, like Wickenburg, or open a state. This list does not show every map.";
      main.appendChild(lead);
      const lab = document.createElement("p");
      lab.className = "section-label";
      lab.textContent = "Topo map collections";
      main.appendChild(lab);
      data.collections.forEach((it) => list.appendChild(resultButton(it)));
      if (data.files.length) {
        const lab2 = document.createElement("p");
        lab2.className = "section-label";
        lab2.textContent = "Other map files";
        list.appendChild(lab2);
        data.files.forEach((it) => list.appendChild(resultButton(it)));
      }
      main.appendChild(list);
      return;
    }

    if (data.mode === "maps-state") {
      const back = document.createElement("button");
      back.type = "button";
      back.className = "hit drive-back";
      back.textContent = "All maps";
      back.addEventListener("click", () => {
        st.maps = null;
        st.letter = "";
        st.topic = "Maps";
        st.screen = "list";
        paint();
      });
      main.appendChild(back);
      const name = st.maps === "AZ" ? "Arizona" : "Nevada";
      const lead = document.createElement("p");
      lead.className = "drive-lead";
      lead.textContent = name + " · " + data.pack.n + " topo quads · " + fmtSize(data.pack.s) + ". Type a place name or tap a letter.";
      main.appendChild(lead);
      paintLetters(main, st.maps);
      if (!tokens(st.q).length && !st.letter) {
        list.appendChild(emptyNote("Type a place name, like Wickenburg, or tap a letter above."));
      } else if (!data.quads.length) {
        list.appendChild(emptyNote("No map matched. Try a shorter name, like a town or canyon."));
      } else {
        const lab = document.createElement("p");
        lab.className = "section-label";
        lab.textContent = data.quads.length + " map" + (data.quads.length === 1 ? "" : "s");
        main.appendChild(lab);
        data.quads.forEach((it) => list.appendChild(resultButton(it)));
      }
      main.appendChild(list);
      return;
    }

    const rows = data.rows || [];
    const quads = data.quads || [];
    if (!rows.length && !quads.length) {
      list.appendChild(emptyNote(st.q.trim()
        ? "Nothing matched. Try one word, like water, knots, or Wickenburg."
        : "Nothing in this topic yet."));
      main.appendChild(list);
      return;
    }
    if (rows.length) {
      const lab = document.createElement("p");
      lab.className = "section-label";
      lab.textContent = rows.length + " item" + (rows.length === 1 ? "" : "s");
      main.appendChild(lab);
      rows.forEach((it) => list.appendChild(resultButton(it)));
    }
    if (quads.length) {
      const lab = document.createElement("p");
      lab.className = "section-label";
      lab.textContent = quads.length + " topo map" + (quads.length === 1 ? "" : "s");
      list.appendChild(lab);
      quads.forEach((it) => list.appendChild(resultButton(it)));
    }
    main.appendChild(list);
  }

  function placeholderText() {
    if (st.maps) return "Place name, like Wickenburg";
    if (st.topic === "Maps") return "Place name or map file";
    return "Search the library";
  }

  function paint() {
    const main = $("#app");
    if (!main) return;
    goHomeChrome();
    main.innerHTML = "";
    const wrap = document.createElement("section");
    wrap.className = "drive-lib";
    wrap.id = "drive-lib";

    const label = document.createElement("p");
    label.className = "section-label";
    label.textContent = st.maps
      ? (st.maps === "AZ" ? "Arizona topo maps" : "Nevada topo maps")
      : "Drive Library";
    wrap.appendChild(label);

    if (!catalog) {
      wrap.appendChild(emptyNote("Loading the drive list…"));
      main.appendChild(wrap);
      return;
    }

    const body = document.createElement("div");
    body.id = "drive-body";
    paintSearch(wrap, placeholderText());
    paintChips(wrap);
    wrap.appendChild(body);
    main.appendChild(wrap);
    if (st.screen === "item" && st.current) paintItem(body);
    else paintList(body);
  }

  function paintListOnly() {
    const body = $("#drive-body");
    if (!body || st.screen === "item") {
      paint();
      return;
    }
    const box = $("#drive-search");
    const start = box ? box.selectionStart : null;
    const end = box ? box.selectionEnd : null;
    body.innerHTML = "";
    paintList(body);
    if (box && start != null) {
      try { box.focus(); box.setSelectionRange(start, end); } catch (_) {}
    }
  }

  function findByPath(path) {
    if (!catalog || !path) return null;
    const items = catalog.items || [];
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (it.p === path) return it;
      if (it.ch && path.indexOf(it.p + "/") === 0) {
        const fn = path.slice(it.p.length + 1);
        const ch = it.ch.find((c) => c[2] === fn);
        if (ch) return { t: ch[0], s: ch[1], p: path, x: "pdf", k: it.k, src: it.src, w: ch[0] };
      }
    }
    const m = path.match(/^20_Maps_Topo\/US_Topo_Current\/(AZ|NV)\/\1_(.+)\.pdf$/);
    if (m) {
      const title = m[2].replace(/_/g, " ");
      const pack = catalog.quads[m[1]];
      const hit = pack && pack.q.find((q) => q[0] === title);
      if (hit) return quadItem(m[1], hit[0], hit[1]);
    }
    return null;
  }

  function open(opts) {
    st.screen = "list";
    st.current = null;
    if (!(opts && opts.path)) {
      st.q = "";
      st.topic = "";
      st.maps = null;
      st.letter = "";
    }
    goHomeChrome();
    if ((location.hash || "").replace(/^#/, "") !== "drive") {
      try { history.replaceState(null, "", "#drive"); } catch (_) {}
    }
    if (catalog) {
      if (opts && opts.path) {
        const it = findByPath(opts.path);
        if (it) {
          st.screen = "item";
          st.current = it;
        }
      }
      paint();
      return;
    }
    const main = $("#app");
    if (main) {
      main.innerHTML = "";
      const p = document.createElement("p");
      p.className = "empty";
      p.textContent = "Loading the drive list…";
      main.appendChild(p);
    }
    loadCatalog().then(() => {
      if (opts && opts.path) {
        const it = findByPath(opts.path);
        if (it) {
          st.screen = "item";
          st.current = it;
        }
      }
      paint();
    }).catch(() => {
      const m = $("#app");
      if (!m) return;
      m.innerHTML = '<p class="empty">Could not load the drive list. After this app is saved, it works offline.</p>';
    });
  }

  function openPath(path) {
    open({ path });
  }

  document.addEventListener("DOMContentLoaded", () => { loadCatalog(); });

  window.SHTF_DRIVE = { open, openPath, loadCatalog, state: st };
})();
