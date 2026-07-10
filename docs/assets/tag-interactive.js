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
