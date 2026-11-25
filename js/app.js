/* Offline Help Library — iPad-first, no network required once served locally */
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const state = {
    view: "home",
    query: "",
    theme: "day",
    dim: 0,
    done: {},
    recent: [],
    wakeLock: null,
    cpr: { on: false, id: null, count: 0, ctx: null },
    boil: { on: false, id: null, remain: 60, total: 60 },
    burn: { on: false, id: null, remain: 600 },
    tqTime: null,
    tqStart: null,
    tqTick: null,
    cprSize: "adult",
    lastCardResults: []
  };

  const TYPE_RANK = { card: 0, infographic: 1, map: 2, pdf: 3, wiki: 4 };
  const TYPE_LABEL = { card: "CARD", infographic: "INFO", map: "MAP", pdf: "PDF", wiki: "WIKI" };

  let mini = null;

  function loadPrefs() {
    try {
      const t = localStorage.getItem("shtf-theme");
      if (t === "night" || t === "day") state.theme = t;
      const r = JSON.parse(localStorage.getItem("shtf-recent") || "[]");
      if (Array.isArray(r)) state.recent = r.slice(0, 4);
    } catch (_) {}
    document.documentElement.setAttribute("data-theme", state.theme);
    updateThemeButton();
  }

  function saveRecent() {
    try { localStorage.setItem("shtf-recent", JSON.stringify(state.recent.slice(0, 4))); } catch (_) {}
  }

  function remember(item) {
    state.recent = [{ id: item.id, title: item.title, kind: item.type || "card" }, ...state.recent.filter((x) => x.id !== item.id)].slice(0, 4);
    saveRecent();
  }

  function buildIndex() {
    mini = new MiniSearch(SEARCH_OPTIONS);
    mini.addAll(buildSearchDocs(LIBRARY));
  }

  // Prebuilt index (data/search-index.json, precached). If a search runs before it loads, build in memory.
  function loadIndex() {
    fetch("data/search-index.json")
      .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
      .then((json) => { if (!mini) mini = MiniSearch.loadJSON(json, SEARCH_OPTIONS); })
      .catch(() => { if (!mini) buildIndex(); });
  }

  function updateThemeButton() {
    const btn = $("#btn-theme");
    if (!btn) return;
    const night = state.theme === "night";
    btn.innerHTML = icon(night ? "sun" : "moon", "glyph") + "<span>" + (night ? "Day" : "Night") + "</span>";
  }

  function setTheme(next) {
    state.theme = next;
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("shtf-theme", next); } catch (_) {}
    updateThemeButton();
  }

  function cycleDim() {
    const first = !localStorage.getItem("shtf-dim-tip");
    state.dim = (state.dim + 1) % 3;
    const ov = $("#dim-overlay");
    ov.style.opacity = state.dim === 0 ? "0" : state.dim === 1 ? "0.28" : "0.5";
    const btn = $("#btn-dim");
    if (btn) btn.querySelector("span").textContent = state.dim ? "Dim " + state.dim : "Dim";
    if (first) {
      try { localStorage.setItem("shtf-dim-tip", "1"); } catch (_) {}
      const tip = $("#dim-tip");
      if (tip) {
        tip.hidden = false;
        const hide = () => { tip.hidden = true; };
        const ok = $("#dim-tip-ok");
        if (ok) ok.onclick = hide;
        setTimeout(hide, 8000);
      }
    }
  }

  async function requestWake(on) {
    if (!on) {
      if (state.wakeLock) { try { await state.wakeLock.release(); } catch (_) {} state.wakeLock = null; }
      return;
    }
    try {
      if (navigator.wakeLock) state.wakeLock = await navigator.wakeLock.request("screen");
    } catch (_) {}
  }

  function home() {
    stopTimers();
    requestWake(false);
    state.view = "home";
    state.done = {};
    state.lastCardResults = [];
    if ((location.hash || "").replace(/^#/, "") === "drive") {
      try { history.replaceState(null, "", location.pathname + location.search); } catch (_) {}
    }
    $("#topbar").classList.remove("is-hidden");
    renderRecent();
    const main = $("#app");
    main.innerHTML = "";
    if (window.SHTF_UPDATES) SHTF_UPDATES.renderHomeStatus(main);

    const h = document.createElement("p");
    h.className = "section-label";
    h.textContent = "Help now";
    main.appendChild(h);

    const grid = document.createElement("div");
    grid.className = "help-grid";
    const order = LIBRARY.helpNowOrder || [];
    for (const id of order) {
      const c = LIBRARY.cards.find((x) => x.id === id);
      if (!c) continue;
      grid.appendChild(helpTile(c));
    }
    const all = document.createElement("button");
    all.type = "button";
    all.className = "help-tile all-tile";
    all.innerHTML = icon("all", "glyph") + '<span class="label">ALL EMERGENCIES</span>';
    all.addEventListener("click", openAllEmergencies);
    grid.appendChild(all);
    main.appendChild(grid);

    const h2 = document.createElement("p");
    h2.className = "section-label";
    h2.textContent = "Find a topic";
    main.appendChild(h2);

    const cats = document.createElement("div");
    cats.className = "cat-grid";
    for (const cat of LIBRARY.categories) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "cat-tile";
      b.innerHTML = icon(cat.icon, "glyph") + '<span class="label">' + escapeHtml(cat.label) + "</span>";
      b.addEventListener("click", () => openCategory(cat.id));
      cats.appendChild(b);
    }
    main.appendChild(cats);
  }

  function helpTile(c) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "help-tile";
    b.innerHTML = icon(c.helpIcon, "glyph") +
      '<span class="label">' + escapeHtml(c.helpLabel) + "</span>" +
      (c.helpSub ? '<span class="sub">' + escapeHtml(c.helpSub) + "</span>" : "");
    b.addEventListener("click", () => openCard(c.id));
    return b;
  }

  function openAllEmergencies() {
    state.view = "all";
    $("#topbar").classList.remove("is-hidden");
    renderRecent();
    const main = $("#app");
    main.innerHTML = "";
    const title = document.createElement("p");
    title.className = "section-label";
    title.textContent = "All emergencies";
    main.appendChild(title);
    const list = document.createElement("div");
    list.className = "list";
    const items = LIBRARY.cards.filter((c) => c.helpNow || c.emergency);
    for (const c of items) {
      list.appendChild(listButton({ ...c, type: "card" }, () => openCard(c.id)));
    }
    main.appendChild(list);
  }

  function openCategory(id) {
    const cat = LIBRARY.categories.find((c) => c.id === id);
    state.view = "category";
    $("#topbar").classList.remove("is-hidden");
    renderRecent();
    const main = $("#app");
    main.innerHTML = "";
    const title = document.createElement("p");
    title.className = "section-label";
    title.textContent = cat ? cat.label : id;
    main.appendChild(title);
    const intro = document.createElement("p");
    intro.textContent = LIBRARY.categoryCopy[id] || "";
    main.appendChild(intro);
    if ((LIBRARY.categoryCopy[id] || "").startsWith("PLACEHOLDER")) {
      const flag = document.createElement("p");
      flag.className = "placeholder-flag";
      flag.textContent = "PLACEHOLDER — this topic is not filled in yet.";
      main.appendChild(flag);
    }
    const items = [];
    for (const c of LIBRARY.cards.filter((x) => x.category === id || x.pin === id)) items.push({ kind: "card", data: c, pin: c.pin === id });
    for (const d of LIBRARY.docs.filter((x) => x.category === id)) items.push({ kind: "doc", data: d, pin: false });
    items.sort((a, b) => (b.pin - a.pin) || ((a.data.title || "").localeCompare(b.data.title || "")));
    const list = document.createElement("div");
    list.className = "list";
    if (!items.length) {
      const p = document.createElement("p");
      p.className = "empty";
      p.textContent = "Nothing here yet.";
      list.appendChild(p);
    }
    for (const it of items) {
      list.appendChild(listButton(it.kind === "card" ? { ...it.data, type: "card" } : it.data, () => {
        if (it.kind === "card") openCard(it.data.id);
        else openDoc(it.data);
      }));
    }
    main.appendChild(list);
  }

  function listButton(item, onClick, opts) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "list-item" + (opts && opts.featured ? " result featured" : " result");
    const chip = '<span class="chip chip-' + (item.type === "card" ? "CARD" : (item.type || "pdf").toUpperCase()) + '">' + (TYPE_LABEL[item.type] || (item.type || "").toUpperCase()) + "</span>";
    const sub = opts && opts.sub
      ? opts.sub
      : (item.placeholder ? "SAMPLE / PLACEHOLDER" : (item.type === "wiki" ? "Opens in the Kiwix app once ZIMs are on the drive" : (item.path || "")));
    const g = item.helpIcon ? item.helpIcon : (item.type === "map" ? "maps" : item.type === "wiki" ? "wiki" : item.type === "card" ? "medical" : "pdf");
    let extra = chip;
    if (opts && opts.openArrow) {
      extra = '<span class="open-arrow">Go</span>';
    }
    b.innerHTML = icon(g, "glyph") +
      '<span class="meta"><span class="title">' + (opts && opts.titleHtml ? opts.titleHtml : escapeHtml(item.title)) + '</span><span class="sub">' + (opts && opts.subHtml ? opts.subHtml : escapeHtml(sub)) + "</span></span>" + extra;
    b.addEventListener("click", onClick);
    return b;
  }

  function openDoc(doc) {
    remember(doc);
    renderRecent();
    if (doc.path) {
      window.open(doc.path, "_blank");
      return;
    }
    const main = $("#app");
    $("#topbar").classList.remove("is-hidden");
    main.innerHTML = '<p class="placeholder-flag">This item is a pointer, not a file in the prototype.</p><p>' + escapeHtml(doc.title) + "</p><p>" +
      (doc.type === "wiki" ? "On the real library, open this ZIM in the Kiwix app. Choose Open, not Import, so it stays on the SSD." :
        doc.type === "map" ? "On the real library, open Organic Maps or the USGS GeoPDF from Files on the SSD." :
        "The file is not bundled in this prototype.") + "</p>";
  }

  function openCard(id) {
    const card = LIBRARY.cards.find((c) => c.id === id);
    if (!card) return;
    stopTimers(false);
    state.view = "card";
    state.done = {};
    state.cprSize = "adult";
    remember(card);
    $("#topbar").classList.add("is-hidden");
    const rec = $("#recent");
    if (rec) rec.hidden = true;
    requestWake(true);

    const main = $("#app");
    main.innerHTML = "";

    const header = document.createElement("div");
    header.className = "card-header";
    const h1 = document.createElement("h1");
    h1.textContent = card.title;
    header.appendChild(h1);
    const actions = document.createElement("div");
    actions.className = "header-actions";
    if (card.related) {
      for (const r of card.related) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "header-action";
        b.textContent = r.label;
        b.addEventListener("click", () => openCard(r.id));
        actions.appendChild(b);
      }
    }
    if (card.headerAction) actions.appendChild(renderHeaderAction(card.headerAction));
    const homeBtn = document.createElement("button");
    homeBtn.type = "button";
    homeBtn.className = "hit";
    homeBtn.innerHTML = icon("home", "glyph") + "<span>Home</span>";
    homeBtn.addEventListener("click", () => { $("#search").value = ""; state.query = ""; home(); });
    actions.appendChild(homeBtn);
    header.appendChild(actions);
    main.appendChild(header);

    if (card.headerAction === "cpr") {
      const bar = document.createElement("div");
      bar.id = "cpr-runbar";
      bar.className = "cpr-runbar";
      bar.hidden = true;
      bar.innerHTML =
        '<span class="cpr-runbar-pulse" id="cpr-dot"></span>' +
        '<span class="cpr-runbar-count" id="cpr-count">1</span>' +
        '<span class="cpr-runbar-label">110 beats a minute</span>' +
        '<button type="button" class="cpr-runbar-stop" id="cpr-stop">Stop</button>';
      main.appendChild(bar);
      bar.querySelector("#cpr-stop").addEventListener("click", () => toggleCpr());
    }

    const banner = document.createElement("div");
    banner.className = "call-banner";
    banner.textContent = "Stay safe. Call 911 if you can. Keep going.";
    main.appendChild(banner);

    const body = document.createElement("div");
    body.className = "card-body";

    const steps = document.createElement("div");
    steps.className = "steps";
    card.steps.forEach((step, i) => steps.appendChild(renderStep(card, step, i)));
    body.appendChild(steps);

    const confirm = document.createElement("div");
    confirm.className = "confirm-box";
    confirm.id = "all-done";
    confirm.innerHTML = "<h2>You're doing it right</h2><p>You checked every step. Stay with the person. Keep going until help takes over.</p>";
    body.appendChild(confirm);

    const stop = document.createElement("div");
    stop.className = "stop-box";
    stop.innerHTML = "<h2>GET HELP FAST IF</h2><ul>" + card.stopIf.map((t) => "<li>" + escapeHtml(t) + "</li>").join("") + "</ul>";
    body.appendChild(stop);

    const details = card.steps.filter((s) => s.caption).map((s, i) => "<li>" + escapeHtml(s.caption) + "</li>").join("");
    const src = document.createElement("div");
    src.className = "source-box";
    src.innerHTML = "<h2>More detail</h2>" +
      (details ? '<ul class="detail-note">' + details + "</ul>" : "") +
      "<p>These steps are from " + escapeHtml(card.source.name) + ".</p><p>" + escapeHtml(card.source.extra) + "</p>" +
      (card.source.url ? '<p><a href="' + card.source.url + '">Source page (needs internet — copy is also on the planned SSD library)</a></p>' : "") +
      '<p class="detail-note">This is basic first aid, not a doctor. Get an adult / call 911. If the iPad screen goes to sleep, turn off Auto-Lock in Settings while you help.</p>';
    body.appendChild(src);

    main.appendChild(body);
    main.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  function renderHeaderAction(kind) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "header-action";
    if (kind === "cpr") {
      b.id = "hdr-cpr";
      b.innerHTML = icon("cpr", "glyph-sm") + '<span id="cpr-label">START CPR BEAT</span>';
      b.addEventListener("click", () => toggleCpr());
    } else if (kind === "tourniquet") {
      return renderTourniquetControl();
    } else if (kind === "burn") {
      b.id = "hdr-burn";
      b.innerHTML = '<span id="burn-label">START 10 MIN</span> <span class="timer-readout" id="burn-time">10:00</span>';
      b.addEventListener("click", () => toggleBurn(b));
    } else if (kind === "boil") {
      b.id = "hdr-boil";
      b.innerHTML = '<span id="boil-label">START BOIL</span> <span class="timer-readout" id="boil-time">1:00</span>';
      b.addEventListener("click", () => toggleBoil(b));
    }
    return b;
  }

  function stepView(card, step, i) {
    if (!(card.sizeSwitch && card.sizes)) return step;
    const sz = card.sizes[state.cprSize || "adult"] || card.sizes.adult;
    if (!sz) return step;
    if (i === 0) {
      return Object.assign({}, step, {
        text: sz.step1Text || step.text,
        caption: sz.step1Caption || step.caption,
        drawing: sz.drawing || step.drawing
      });
    }
    if (i === 1 && (sz.step2Caption || sz.step2Drawing)) {
      return Object.assign({}, step, { caption: sz.step2Caption || step.caption, drawing: sz.step2Drawing || step.drawing });
    }
    return step;
  }

  function renderSizeSwitch(card, el) {
    const sw = document.createElement("div");
    sw.className = "size-switch";
    sw.setAttribute("role", "tablist");
    sw.setAttribute("aria-label", "Adult, kid, or baby");
    [["adult", "Adult"], ["kid", "Kid"], ["baby", "Baby"]].forEach(([id, label]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "size-btn" + ((state.cprSize || "adult") === id ? " is-on" : "");
      b.dataset.size = id;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", (state.cprSize || "adult") === id ? "true" : "false");
      b.textContent = label;
      b.addEventListener("click", () => {
        if (state.cprSize === id) return;
        state.cprSize = id;
        const body = el.parentElement;
        if (!body) return;
        const kept = { ...state.done };
        const htmlSteps = body;
        const next = document.createElement("div");
        next.className = "steps";
        card.steps.forEach((step, i) => next.appendChild(renderStep(card, step, i)));
        htmlSteps.replaceWith(next);
        state.done = kept;
        Array.from(next.querySelectorAll(".step")).forEach((row) => {
          const idx = Number(row.dataset.index);
          if (state.done[idx]) {
            row.classList.add("is-done");
            const lab = row.querySelector(".done-btn span:last-child");
            row.querySelector(".done-btn").setAttribute("aria-pressed", "true");
            if (lab) lab.textContent = "Did it";
          }
        });
      });
      sw.appendChild(b);
    });
    el.appendChild(sw);
  }

  function renderStep(card, step, i) {
    const view = stepView(card, step, i);
    const el = document.createElement("article");
    el.className = "step" + (card.sizeSwitch && i === 0 ? " has-size" : "");
    el.dataset.index = String(i);
    if (card.sizeSwitch && i === 0) renderSizeSwitch(card, el);
    const num = document.createElement("span");
    num.className = "num";
    num.textContent = String(i + 1);
    el.appendChild(num);

    if (view.drawing) {
      const fig = document.createElement("button");
      fig.type = "button";
      fig.className = "drawing";
      fig.setAttribute("aria-label", "Enlarge picture for step " + (i + 1));
      const badgeKind = view.badge || "";
      let badge = "";
      if (badgeKind === "ok") badge = '<span class="pic-badge ok" aria-hidden="true">' + icon("check") + "</span>";
      if (badgeKind === "bad") badge = '<span class="pic-badge bad" aria-hidden="true">' + icon("close") + "</span>";
      fig.innerHTML = badge + '<span class="mag-badge" aria-hidden="true">' + icon("mag") + "</span>" + (DRAWINGS[view.drawing] || DRAWINGS["placeholder-detail"] || "");
      fig.addEventListener("click", () => enlarge(view.drawing, view.caption || view.text));
      el.appendChild(fig);
    }

    const p = document.createElement("p");
    p.className = "step-text";
    p.textContent = view.text;
    el.appendChild(p);

    const done = document.createElement("button");
    done.type = "button";
    done.className = "done-btn";
    done.innerHTML = '<span class="done-mark">' + icon("check", "glyph") + "</span><span>Done</span>";
    done.setAttribute("aria-pressed", "false");
    done.addEventListener("click", () => {
      state.done[i] = !state.done[i];
      el.classList.toggle("is-done", !!state.done[i]);
      done.setAttribute("aria-pressed", state.done[i] ? "true" : "false");
      done.querySelector("span:last-child").textContent = state.done[i] ? "Did it" : "Done";
      const all = card.steps.every((_, n) => state.done[n]);
      const box = $("#all-done");
      if (box) box.classList.toggle("show", all);
      if (state.done[i]) {
        const next = el.nextElementSibling;
        if (next && next.classList.contains("step")) {
          setTimeout(() => next.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
        } else if (box) {
          setTimeout(() => box.scrollIntoView({ behavior: "smooth", block: "nearest" }), 80);
        }
      }
    });
    el.appendChild(done);
    return el;
  }

  function formatTqReadout() {
    if (!state.tqStart) return "";
    const started = new Date(state.tqStart);
    const clock = started.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    const mins = Math.floor((Date.now() - state.tqStart) / 60000);
    return "ON " + clock + " · " + mins + " min";
  }

  function paintTourniquet(wrap) {
    const host = wrap || $("#tq-wrap");
    if (!host) return;
    host.innerHTML = "";
    if (!state.tqStart) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "header-action tq-idle";
      b.id = "hdr-tq";
      b.innerHTML = icon("watch", "glyph-sm") + "<span>TOURNIQUET TIME</span>";
      b.addEventListener("click", startTourniquet);
      host.appendChild(b);
      return;
    }
    const readout = document.createElement("div");
    readout.className = "header-action tq-running";
    readout.id = "hdr-tq";
    readout.setAttribute("aria-live", "polite");
    readout.textContent = formatTqReadout();
    const reset = document.createElement("button");
    reset.type = "button";
    reset.className = "tq-reset";
    reset.id = "tq-reset";
    reset.textContent = "Reset";
    reset.addEventListener("click", resetTourniquet);
    host.appendChild(readout);
    host.appendChild(reset);
  }

  function renderTourniquetControl() {
    const wrap = document.createElement("div");
    wrap.className = "tq-wrap";
    wrap.id = "tq-wrap";
    paintTourniquet(wrap);
    if (state.tqStart) startTqTick();
    return wrap;
  }

  function startTourniquet() {
    if (state.tqStart) return;
    state.tqStart = Date.now();
    state.tqTime = formatTqReadout();
    paintTourniquet();
    startTqTick();
  }

  function resetTourniquet() {
    state.tqStart = null;
    state.tqTime = null;
    if (state.tqTick) { clearInterval(state.tqTick); state.tqTick = null; }
    paintTourniquet();
  }

  function startTqTick() {
    if (state.tqTick) clearInterval(state.tqTick);
    state.tqTick = setInterval(() => {
      const n = $("#hdr-tq");
      if (n && state.tqStart && n.classList.contains("tq-running")) n.textContent = formatTqReadout();
    }, 1000);
  }

  function toggleCpr() {
    if (state.cpr.on) { stopCpr(); return; }
    state.cpr.on = true;
    state.cpr.count = 0;
    const startBtn = $("#hdr-cpr");
    if (startBtn) startBtn.hidden = true;
    const bar = $("#cpr-runbar");
    if (bar) {
      bar.hidden = false;
      bar.classList.add("is-on");
    }
    requestWake(true);
    const interval = 60000 / 110;
    const beep = () => {
      try {
        const ctx = state.cpr.ctx || new (window.AudioContext || window.webkitAudioContext)();
        state.cpr.ctx = ctx;
        if (ctx.state === "suspended") ctx.resume();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.frequency.value = 880;
        g.gain.value = 0.08;
        o.connect(g); g.connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.05);
      } catch (_) {}
      state.cpr.count = (state.cpr.count % 30) + 1;
      const n = $("#cpr-count");
      if (n) n.textContent = String(state.cpr.count);
      const d = $("#cpr-dot");
      if (d) { d.classList.remove("pulse"); void d.offsetWidth; d.classList.add("pulse"); }
    };
    beep();
    state.cpr.id = setInterval(beep, interval);
  }
  function stopCpr() {
    state.cpr.on = false;
    if (state.cpr.id) clearInterval(state.cpr.id);
    state.cpr.id = null;
    state.cpr.count = 0;
    const d = $("#cpr-dot");
    if (d) d.classList.remove("pulse");
    const bar = $("#cpr-runbar");
    if (bar) {
      bar.hidden = true;
      bar.classList.remove("is-on");
    }
    const n = $("#cpr-count");
    if (n) n.textContent = "1";
    const startBtn = $("#hdr-cpr");
    if (startBtn) startBtn.hidden = false;
  }
  function updateBoil() {
    const n = $("#boil-time");
    if (!n) return;
    const m = Math.floor(state.boil.remain / 60), s = state.boil.remain % 60;
    n.textContent = m + ":" + String(s).padStart(2, "0");
  }
  function toggleBoil(btn) {
    if (state.boil.on) { state.boil.on = false; clearInterval(state.boil.id); const l = $("#boil-label"); if (l) l.textContent = "START BOIL"; return; }
    state.boil.on = true;
    if (state.boil.remain <= 0) state.boil.remain = state.boil.total;
    const l = $("#boil-label");
    if (l) l.textContent = "STOP";
    updateBoil();
    state.boil.id = setInterval(() => {
      state.boil.remain = Math.max(0, state.boil.remain - 1);
      updateBoil();
      if (state.boil.remain === 0) { clearInterval(state.boil.id); state.boil.on = false; if (l) l.textContent = "DONE — LET COOL"; }
    }, 1000);
  }
  function toggleBurn() {
    const l = $("#burn-label");
    if (state.burn.on) { state.burn.on = false; clearInterval(state.burn.id); if (l) l.textContent = "START 10 MIN"; return; }
    state.burn.on = true;
    if (state.burn.remain <= 0) state.burn.remain = 600;
    if (l) l.textContent = "STOP";
    state.burn.id = setInterval(() => {
      state.burn.remain = Math.max(0, state.burn.remain - 1);
      const n = $("#burn-time");
      const m = Math.floor(state.burn.remain / 60), s = state.burn.remain % 60;
      if (n) n.textContent = m + ":" + String(s).padStart(2, "0");
      if (state.burn.remain === 0) { clearInterval(state.burn.id); state.burn.on = false; if (l) l.textContent = "DONE — COVER"; }
    }, 1000);
  }
  function stopTimers(reset = true) {
    stopCpr();
    if (state.boil.id) clearInterval(state.boil.id);
    if (state.burn.id) clearInterval(state.burn.id);
    state.boil.on = false;
    state.burn.on = false;
    if (reset) { state.boil.remain = state.boil.total || 60; state.burn.remain = 600; state.cpr.count = 0; }
  }

  function enlarge(drawingId, caption) {
    const box = $("#lightbox");
    const stage = $("#lightbox-stage");
    stage.innerHTML = DRAWINGS[drawingId] || DRAWINGS["placeholder-detail"] || "";
    $("#lightbox-cap").textContent = caption || "";
    box.hidden = false;
  }
  function closeLightbox() { $("#lightbox").hidden = true; }

  function highlight(text, q) {
    const words = q.trim().split(/\s+/).filter((w) => w.length >= 2);
    if (!words.length) return escapeHtml(text);
    const re = new RegExp("(" + words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "ig");
    return escapeHtml(text).replace(re, "<mark>$1</mark>");
  }

  const SYN_TITLES = {
    snake: "Snake bite",
    snakebite: "Snake bite",
    rattlesnake: "Snake bite",
    sting: "Sting",
    bee: "Bee sting",
    wasp: "Wasp sting",
    scorpion: "Scorpion sting",
    venom: "Venom bite",
    allergy: "Allergy",
    allergic: "Allergy",
    dizzy: "Dizzy",
    "heat stroke": "Heat stroke",
    "heat exhaustion": "Heat exhaustion",
    "passed out": "Passed out",
    unconscious: "Unconscious",
    collapse: "Collapse",
    cpr: "CPR",
    choking: "Choking",
    hemorrhage: "Bleeding",
    spurting: "Bleeding",
    soaking: "Bleeding"
  };

  function prettyHelpLabel(item) {
    if (item.helpLabel) {
      return item.helpLabel.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    }
    return item.title;
  }

  function resultTitle(item, q) {
    const raw = (q || "").trim();
    if (!raw) return item.title;
    const low = raw.toLowerCase();
    const titleLow = (item.title || "").toLowerCase();
    const terms = low.split(/\s+/).filter((t) => t.length >= 2);
    if (terms.some((t) => titleLow.includes(t))) return item.title;
    const map = Object.assign({}, SYN_TITLES, item.synonymTitles || {});
    const keys = Object.keys(map).sort((a, b) => b.length - a.length);
    const syns = (item.synonyms || []).map((s) => s.toLowerCase());
    for (const k of keys) {
      if (!low.includes(k)) continue;
      if (syns.some((s) => s.includes(k) || k.includes(s) || s === k) || map[k]) {
        if (!syns.length || syns.some((s) => s.includes(k) || k.includes(s))) return map[k];
      }
    }
    const hit = terms.find((t) => syns.some((s) => s.includes(t) || t.includes(s)));
    if (hit) return hit.replace(/\b\w/g, (c) => c.toUpperCase());
    return item.title;
  }

  function resultSubline(item, q) {
    const titleUsed = resultTitle(item, q);
    const n = (item.steps || []).length;
    if (titleUsed !== item.title) {
      return n ? prettyHelpLabel(item) + " card, steps 1–" + n : prettyHelpLabel(item) + " card";
    }
    return whyMatched(item, q);
  }

  function whyMatched(item, q) {
    const terms = q.toLowerCase().split(/\s+/).filter((t) => t.length >= 2);
    if (item.steps) {
      const hits = [];
      item.steps.forEach((s, i) => {
        const blob = (s.text + " " + (s.caption || "")).toLowerCase();
        if (terms.some((t) => blob.includes(t))) hits.push(i + 1);
      });
      if (hits.length) return item.title + ": steps " + hits[0] + (hits.length > 1 ? "–" + hits[hits.length - 1] : "");
      const syn = (item.synonyms || []).some((s) => terms.some((t) => s.toLowerCase().includes(t) || t.includes(s.toLowerCase())));
      if (syn) return item.title + ": steps 1–" + item.steps.length;
    }
    if (item.body) {
      const low = item.body.toLowerCase();
      const hit = terms.find((t) => low.includes(t));
      if (hit) return "Mentions “" + hit + "”";
    }
    return item.placeholder ? "SAMPLE / PLACEHOLDER" : "";
  }

  function runSearch(q) {
    state.query = q;
    if (q.trim().length < 2) {
      state.lastCardResults = [];
      if (state.view === "search") home();
      return;
    }
    state.view = "search";
    $("#topbar").classList.remove("is-hidden");
    if (!mini) buildIndex();
    const raw = mini.search(q, { fuzzy: 0.2, prefix: true });
    raw.sort((a, b) => {
      const d = (TYPE_RANK[a.type] ?? 9) - (TYPE_RANK[b.type] ?? 9);
      return d !== 0 ? d : b.score - a.score;
    });
    const cards = [];
    const rest = [];
    for (const r of raw) {
      if (r.id.startsWith("card:")) {
        const item = LIBRARY.cards.find((c) => c.id === r.id.slice(5));
        if (item) cards.push(item);
      } else {
        const item = LIBRARY.docs.find((d) => d.id === r.id.slice(4));
        if (item) rest.push(item);
      }
    }
    state.lastCardResults = cards;
    const main = $("#app");
    main.innerHTML = '<p class="section-label">Results for “' + escapeHtml(q) + '”</p>';
    const list = document.createElement("div");
    list.className = "list";
    if (!cards.length && !rest.length) {
      const p = document.createElement("p");
      p.className = "empty";
      p.textContent = "Nothing matched. Try a simple word, like water, burn, or snake.";
      list.appendChild(p);
    }
    const oneCard = cards.length === 1;
    cards.forEach((item) => {
      list.appendChild(listButton(item, () => openCard(item.id), {
        featured: oneCard,
        openArrow: oneCard,
        titleHtml: highlight(resultTitle(item, q), q),
        subHtml: highlight(resultSubline(item, q) || "", q)
      }));
    });
    if (rest.length) {
      const h = document.createElement("p");
      h.className = "section-label";
      h.textContent = "More in the library";
      list.appendChild(h);
      rest.forEach((item) => {
        list.appendChild(listButton(item, () => openDoc(item), {
          titleHtml: highlight(item.title, q),
          subHtml: highlight(whyMatched(item, q) || (item.placeholder ? "SAMPLE / PLACEHOLDER" : item.type.toUpperCase()), q)
        }));
      });
    }
    main.appendChild(list);
    renderRecent();
  }

  function openTopSearchHit() {
    if (state.lastCardResults && state.lastCardResults[0]) {
      openCard(state.lastCardResults[0].id);
      return true;
    }
    return false;
  }

  function renderRecent() {
    const el = $("#recent");
    if (!el) return;
    if (!state.recent.length || state.view === "card") {
      el.hidden = true;
      return;
    }
    el.hidden = false;
    el.innerHTML = "<strong>Recently opened</strong>";
    const list = document.createElement("div");
    list.className = "recent-list";
    for (const r of state.recent) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "recent-item";
      b.textContent = r.title;
      b.addEventListener("click", () => {
        if (r.id && String(r.id).indexOf("drive:") === 0 && window.SHTF_DRIVE) {
          SHTF_DRIVE.openPath(r.id.slice(6));
          return;
        }
        if (LIBRARY.cards.some((c) => c.id === r.id)) openCard(r.id);
        else {
          const d = LIBRARY.docs.find((x) => x.id === r.id);
          if (d) openDoc(d);
        }
      });
      list.appendChild(b);
    }
    el.appendChild(list);
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  function bindChrome() {
    $("#btn-home").addEventListener("click", () => { $("#search").value = ""; state.query = ""; home(); });
    $("#btn-theme").addEventListener("click", () => setTheme(state.theme === "day" ? "night" : "day"));
    $("#btn-dim").addEventListener("click", cycleDim);
    $("#search").addEventListener("input", (e) => runSearch(e.target.value));
    $("#search-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const q = $("#search").value;
      runSearch(q);
      if (!openTopSearchHit()) runSearch(q);
    });
    $("#lightbox-close").addEventListener("click", closeLightbox);
    $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible" && state.view === "card") requestWake(true);
    });
  }

  window.SHTF = { home, openCard, runSearch, openAllEmergencies, state, remember, renderRecent, stopTimers };

  document.addEventListener("DOMContentLoaded", () => {
    loadPrefs();
    loadIndex();
    bindChrome();
    updateThemeButton();
    const hash = (location.hash || "").replace(/^#/, "");
    if (hash === "night") { setTheme("night"); home(); }
    else if (hash === "all") { home(); openAllEmergencies(); }
    else if (hash.startsWith("card/")) { home(); openCard(hash.slice(5)); }
    else if (hash === "updates" && window.SHTF_UPDATES) { home(); stopTimers(); SHTF_UPDATES.openUpdates(); }
    else if (hash === "drive" && window.SHTF_DRIVE) { home(); SHTF_DRIVE.open(); }
    else if (hash.startsWith("search/")) { home(); const q = decodeURIComponent(hash.slice(7)); $("#search").value = q; runSearch(q); }
    else { home(); }
    window.addEventListener("hashchange", () => {
      const h = (location.hash || "").replace(/^#/, "");
      if (!h) home();
      else if (h === "all") openAllEmergencies();
      else if (h === "updates" && window.SHTF_UPDATES) { stopTimers(); SHTF_UPDATES.openUpdates(); }
      else if (h === "drive" && window.SHTF_DRIVE) SHTF_DRIVE.open();
      else if (h.startsWith("card/")) openCard(h.slice(5));
      else if (h.startsWith("search/")) { const q = decodeURIComponent(h.slice(7)); $("#search").value = q; runSearch(q); }
    });
  });
})();
