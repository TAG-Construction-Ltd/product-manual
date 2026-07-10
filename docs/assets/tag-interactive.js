/* TAG Help Centre interactivity - re-binds on every instant-navigation page change */
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

/* Tier explorer (Chapter 5) */
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
