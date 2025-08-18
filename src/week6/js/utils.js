// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

// loading
window.addEventListener("load", () => {
  const loader = document.getElementById("loading-screen");
  
  loader.classList.add("transition"); // 加上 class 啟動 CSS transition
  document.body.classList.remove("loading"); // 解除畫面鎖定

  loader.addEventListener('transitionend', () => {
    loader.classList.add("stop"); // 完全隱藏並停止動畫
  });
});