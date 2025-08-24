import { C as Carousel } from "../../chunks/bootstrap.esm.js";
const mdBreakpoint = parseInt(
  getComputedStyle(document.documentElement).getPropertyValue("--bs-breakpoint-md")
);
const heroCarousel = document.querySelector("#hero-carousel");
const carousel = new Carousel(heroCarousel, {
  interval: 3e3,
  pause: false,
  ride: true
});
function toggleCarouselAutoplay() {
  if (window.innerWidth >= mdBreakpoint) {
    carousel.pause();
  } else {
    carousel.cycle();
  }
}
function resetMarginLeft() {
  const topList = document.querySelector("#top-list");
  const topMarginRight = topList.style.marginRight ? parseInt(topList.style.marginRight, 10) : 0;
  const recommendList = document.querySelector("#recommend-list");
  const recommendMarginRight = recommendList.style.marginRight ? parseInt(recommendList.style.marginRight, 10) : 0;
  if (window.innerWidth >= mdBreakpoint) {
    if (topList.style.marginRight) {
      topList.style.marginRight = "";
      console.log(`重設「TOP 10」 ul 的 style: margin-right`);
    }
    if (recommendList.style.marginRight) {
      recommendList.style.marginRight = "";
      console.log(`重設「大阪推薦」 ul 的 style: margin-right`);
    }
  } else {
    const topRect = topList.getBoundingClientRect();
    if (topRect.left === 0 && topMarginRight !== 0 || topRect.left > 0) {
      topList.style.marginRight = `-${topRect.left}px`;
      console.log(`調整「TOP 10」 ul 的 margin-right: -${topRect.left}px`);
    }
    const recommendRect = recommendList.getBoundingClientRect();
    if (recommendRect.left === 0 && recommendMarginRight !== 0 || recommendRect.left > 0) {
      recommendList.style.marginRight = `-${recommendRect.left}px`;
      console.log(`調整「大阪推薦」 ul 的 margin-right: -${recommendRect.left}px`);
    }
  }
}
toggleCarouselAutoplay();
resetMarginLeft();
window.addEventListener("resize", () => {
  toggleCarouselAutoplay();
  resetMarginLeft();
});
