// Import custom CSS
import "../scss/style.scss";

import 'animate.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

// Import utils
import * as utils from './utils'

AOS.init();


const btnsHoverEffects = document.querySelectorAll(".custom-btn-hover");
btnsHoverEffects.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    el.classList.add("animate__animated", "animate__pulse", "animate__infinite");
  });

  el.addEventListener("mouseleave", () => {
    el.classList.remove("animate__animated", "animate__pulse", "animate__infinite");
  });
})


// 取得 Bootstrap 的 md 斷點寬度（來自 CSS 變數）
const bootstrapMd = parseInt(
  getComputedStyle(document.documentElement)
    .getPropertyValue('--bs-breakpoint-md')
);

// 防抖 (debounce) 工具函式
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// 主函式：傳入 HTML id
function updateWidth(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const runOnlyOnMd = id.includes('-md-');

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

// 包裝成防抖版
const updateWidthsDebounced = debounce((ids) => {
  ids.forEach(id => {
    updateWidth(id);
  });
}, 200);

const listIds = ['story-md-list', 'serve-list'];

// 綁定 resize
window.addEventListener('resize', () => {
  updateWidthsDebounced(listIds);
});

// 初始載入執行一次
updateWidthsDebounced(listIds);
