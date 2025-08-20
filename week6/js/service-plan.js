import "../../chunks/utils.js";
/* empty css                   */
import "../../chunks/bootstrap.esm.js";
const btnsHoverEffects = document.querySelectorAll(".custom-btn-hover");
btnsHoverEffects.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    el.classList.add("animate__animated", "animate__pulse", "animate__infinite");
  });
  el.addEventListener("mouseleave", () => {
    el.classList.remove("animate__animated", "animate__pulse", "animate__infinite");
  });
});
