// Shows a single board when the page is opened with ?board=<id>; otherwise previews all.
(function () {
  const id = new URLSearchParams(location.search).get("board");
  document.body.classList.add(id ? "render" : "preview");
  if (!id) return;
  const el = document.getElementById(id);
  if (el) el.classList.add("is-active");
})();
