/* TAG Help Centre interactivity — re-binds on every instant-navigation page change */

/* ---- Command-palette: Cmd/Ctrl+K opens Material search (bound once) ---- */
window.addEventListener("keydown", function (e) {
  var k = (e.key || "").toLowerCase();
  if ((e.metaKey || e.ctrlKey) && k === "k") {
    var toggle = document.querySelector('[data-md-toggle="search"]');
    var input = document.querySelector(".md-search__input");
    if (toggle && input) {
      e.preventDefault();
      toggle.checked = true;
      setTimeout(function () { input.focus(); input.select(); }, 60);
    }
  }
});

/* ---- Hotspots (image annotations) ---- */
document$.subscribe(function () {
  document.querySelectorAll(".shot").forEach(function (shot) {
    var note = shot.querySelector(".hs-note");
    var spots = shot.querySelectorAll(".hs");
    spots.forEach(function (btn) {
      btn.addEventListener("click", function () {
        spots.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        if (note) note.innerHTML = "<strong>" + btn.textContent + "</strong> — " + btn.getAttribute("data-note");
      });
    });
    if (spots.length && note && !note.innerHTML.trim()) {
      spots[0].click();
    }
  });
});

/* ---- Hero subtitle: typing reveal on first load (motion-safe) ---- */
document$.subscribe(function () {
  var sub = document.querySelector(".tag-hero-sub");
  if (!sub || sub.dataset.done === "1") return;
  var full = (sub.getAttribute("data-typed") || sub.textContent || "").trim();
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !full) { sub.textContent = full; sub.dataset.done = "1"; return; }
  sub.innerHTML = '<span class="typed"></span><span class="cursor">▋</span>';
  var typed = sub.querySelector(".typed");
  var i = 0;
  (function tick() {
    if (i <= full.length) { typed.textContent = full.slice(0, i); i++; setTimeout(tick, 16); }
    else { sub.dataset.done = "1"; var c = sub.querySelector(".cursor"); if (c) { setTimeout(function () { c.remove(); }, 1200); } }
  })();
});

/* ---- Tier explorer (Chapter 5) ---- */
document$.subscribe(function () {
  var ex = document.querySelector(".tier-explorer");
  if (!ex) return;
  var TIERS = [
    { min: 85, name: "Site Pro", cls: "tx-pro" },
    { min: 70, name: "Site Strong", cls: "tx-strong" },
    { min: 35, name: "Site Ready", cls: "tx-ready" },
    { min: 20, name: "Site Starter", cls: "tx-starter" },
    { min: 0,  name: "New Hand", cls: "tx-new" }
  ];
  function update() {
    var score = 0, cscs = false;
    ex.querySelectorAll("input[type=checkbox]").forEach(function (c) {
      if (c.checked) { score += parseInt(c.getAttribute("data-pts"), 10); }
      if (c.getAttribute("data-key") === "cscs") cscs = c.checked;
    });
    var tier = TIERS.find(function (t) { return score >= t.min; });
    ex.querySelector(".tx-score").textContent = score;
    var badge = ex.querySelector(".tx-badge");
    badge.textContent = tier.name;
    badge.className = "tx-badge " + tier.cls;
    ex.querySelector(".tx-bar-fill").style.width = Math.min(score, 100) + "%";
    var hint = ex.querySelector(".tx-hint");
    if (!cscs && score >= 35) {
      hint.textContent = "Notice: without a valid CSCS the maximum is 65 — Site Strong is unreachable. That cap is built into the arithmetic.";
    } else if (score >= 70) {
      hint.textContent = "All four pillars in place — this is what Site Strong means.";
    } else {
      hint.textContent = "Toggle what this worker has verified and watch the tier respond.";
    }
  }
  ex.querySelectorAll("input[type=checkbox]").forEach(function (c) { c.addEventListener("change", update); });
  update();
});

/* ---- Mermaid diagrams: self-heal render (Material can leave them empty) + zoom/pan ---- */
function mzDecode(s) { var t = document.createElement("textarea"); t.innerHTML = s; return t.value; }
function mzAttach(d) {
  if (d.dataset.mz) return;
  var svg = d.querySelector("svg");
  if (svg) initMermaidZoom(d, svg);
}
function mzRenderThenAttach(d) {
  d.removeAttribute("data-processed");
  if (window.mermaid && window.mermaid.run && d.textContent.trim()) {
    window.mermaid.run({ nodes: [d] }).then(function () { mzAttach(d); }, function () { mzAttach(d); });
  } else {
    var obs = new MutationObserver(function () { if (d.querySelector("svg")) { obs.disconnect(); mzAttach(d); } });
    obs.observe(d, { childList: true, subtree: true });
  }
}
document$.subscribe(function () {
  var divs = [].slice.call(document.querySelectorAll(".mermaid"));
  if (!divs.length) return;
  // Give Material a moment to render; then attach zoom to any it drew, and
  // recover + render any it left empty (source stripped, no <svg>).
  setTimeout(function () {
    divs.forEach(function (d) { if (d.querySelector("svg")) mzAttach(d); });
    var empties = divs.filter(function (d) { return !d.dataset.mz && !d.querySelector("svg"); });
    if (!empties.length) return;
    if (empties.every(function (d) { return d.textContent.trim(); })) { empties.forEach(mzRenderThenAttach); return; }
    // Some divs lost their source — pull it back from the page HTML (order matches DOM 1:1 per page)
    fetch(location.href).then(function (r) { return r.text(); }).then(function (html) {
      var srcs = [], re = /<pre class="mermaid"><code>([\s\S]*?)<\/code><\/pre>/g, m;
      while ((m = re.exec(html))) srcs.push(mzDecode(m[1]));
      divs.forEach(function (d, i) {
        if (d.dataset.mz || d.querySelector("svg")) return;
        if (!d.textContent.trim() && srcs[i] != null) d.textContent = srcs[i];
        mzRenderThenAttach(d);
      });
    }).catch(function () { empties.forEach(mzRenderThenAttach); });
  }, 450);
});

function initMermaidZoom(m, svg) {
  m.dataset.mz = "1";
  m.classList.add("mz");
  var s = 1, tx = 0, ty = 0;
  svg.style.transformOrigin = "0 0";
  svg.style.maxWidth = "none";
  function apply() { svg.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + s + ")"; }
  function zoomAt(cx, cy, f) {
    var ns = Math.min(8, Math.max(0.4, s * f));
    tx = cx - (cx - tx) * (ns / s);
    ty = cy - (cy - ty) * (ns / s);
    s = ns; apply();
  }
  function reset() { s = 1; tx = 0; ty = 0; apply(); }

  var bar = document.createElement("div");
  bar.className = "mz-bar";
  function btn(txt, label, fn) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "mz-btn"; b.textContent = txt; b.setAttribute("aria-label", label); b.title = label;
    b.addEventListener("click", function (e) { e.preventDefault(); e.stopPropagation(); fn(); });
    return b;
  }
  bar.appendChild(btn("+", "Zoom in", function () { zoomAt(m.clientWidth / 2, m.clientHeight / 2, 1.25); }));
  bar.appendChild(btn("−", "Zoom out", function () { zoomAt(m.clientWidth / 2, m.clientHeight / 2, 0.8); }));
  bar.appendChild(btn("↻", "Reset", reset));
  bar.appendChild(btn("⛶", "Fullscreen", function () {
    var full = m.classList.toggle("mz-full");
    document.body.classList.toggle("mz-lock", full);
    reset();
  }));
  m.appendChild(bar);

  var hint = document.createElement("div");
  hint.className = "mz-hint";
  hint.textContent = "Ctrl + scroll to zoom · drag to pan";
  m.appendChild(hint);

  // Ctrl/⌘ + wheel zoom (plain scroll still scrolls the page — no scroll trap)
  m.addEventListener("wheel", function (e) {
    if (!(e.ctrlKey || e.metaKey)) return;
    e.preventDefault();
    var r = m.getBoundingClientRect();
    zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 1.15 : 0.87);
  }, { passive: false });

  // drag to pan
  var drag = false, lx = 0, ly = 0;
  m.addEventListener("mousedown", function (e) {
    if (e.target.closest(".mz-bar")) return;
    drag = true; lx = e.clientX; ly = e.clientY; m.classList.add("mz-grab"); e.preventDefault();
  });
  window.addEventListener("mousemove", function (e) {
    if (!drag) return; tx += e.clientX - lx; ty += e.clientY - ly; lx = e.clientX; ly = e.clientY; apply();
  });
  window.addEventListener("mouseup", function () { drag = false; m.classList.remove("mz-grab"); });

  // touch: one-finger pan, two-finger pinch
  var pts = {}, pinchDist = 0;
  m.addEventListener("touchstart", function (e) {
    for (var i = 0; i < e.changedTouches.length; i++) { var t = e.changedTouches[i]; pts[t.identifier] = { x: t.clientX, y: t.clientY }; }
  }, { passive: true });
  m.addEventListener("touchmove", function (e) {
    var ids = Object.keys(pts);
    if (ids.length === 1) {
      var t = e.touches[0], p = pts[t.identifier]; if (!p) return;
      tx += t.clientX - p.x; ty += t.clientY - p.y; p.x = t.clientX; p.y = t.clientY; apply(); e.preventDefault();
    } else if (ids.length >= 2 && e.touches.length >= 2) {
      var a = e.touches[0], b = e.touches[1];
      var d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      var r = m.getBoundingClientRect();
      if (pinchDist) zoomAt((a.clientX + b.clientX) / 2 - r.left, (a.clientY + b.clientY) / 2 - r.top, d / pinchDist);
      pinchDist = d; e.preventDefault();
    }
  }, { passive: false });
  m.addEventListener("touchend", function (e) {
    for (var i = 0; i < e.changedTouches.length; i++) delete pts[e.changedTouches[i].identifier];
    if (Object.keys(pts).length < 2) pinchDist = 0;
  }, { passive: true });

  apply();
}

/* Esc exits any fullscreen diagram (bound once) */
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    var f = document.querySelector(".mermaid.mz-full");
    if (f) { f.classList.remove("mz-full"); document.body.classList.remove("mz-lock"); }
  }
});
