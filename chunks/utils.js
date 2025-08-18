import "./bootstrap.esm.js";
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  loader.classList.add("transition");
  document.body.classList.remove("loading");
  loader.addEventListener("transitionend", () => {
    loader.classList.add("stop");
  });
});
