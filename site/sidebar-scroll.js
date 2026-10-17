const key = "sidebar-content-scroll";
const scroller = document.querySelector("#starlight__sidebar .sidebar-content");
if (scroller) {
  scroller.scrollTop = Number(sessionStorage.getItem(key) ?? 0);
  addEventListener("pagehide", () => sessionStorage.setItem(key, String(scroller.scrollTop)));
}
