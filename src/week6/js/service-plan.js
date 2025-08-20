// Import custom CSS
import "../scss/service-plan.scss";

import 'animate.css';

// Import utils
import * as utils from './utils'

const btnsHoverEffects = document.querySelectorAll(".custom-btn-hover");
btnsHoverEffects.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    el.classList.add("animate__animated", "animate__pulse", "animate__infinite");
  });

  el.addEventListener("mouseleave", () => {
    el.classList.remove("animate__animated", "animate__pulse", "animate__infinite");
  });
})

