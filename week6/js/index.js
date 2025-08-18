import "../../chunks/utils.js";
import "../../chunks/bootstrap.esm.js";
const bootstrapMd = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue("--bs-breakpoint-md")
);
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
function updateWidth(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const runOnlyOnMd = id.includes("-md-");
  const rect = el.getBoundingClientRect();
  const winWidth = window.innerWidth;
  const newWidth = winWidth - rect.left;
  if (runOnlyOnMd) {
    el.style.width = `${newWidth}px`;
  } else {
    if (winWidth <= bootstrapMd) {
      el.style.width = `${newWidth}px`;
    } else {
      el.style.width = `100%`;
    }
  }
}
const updateWidthsDebounced = debounce((ids) => {
  ids.forEach((id) => {
    updateWidth(id);
  });
}, 200);
const listIds = ["story-md-list", "serve-list"];
window.addEventListener("resize", () => {
  updateWidthsDebounced(listIds);
});
updateWidthsDebounced(listIds);
