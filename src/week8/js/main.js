import "../scss/style.scss";

// Import all of Bootstrap’s JS
import * as bootstrap from 'bootstrap'

import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const recommendSwiper = new Swiper("#recommend-swiper", {
  modules: [Pagination],
  slidesPerView: "auto",
  pagination: {
    el: "#recommend-swiper-pagination",
    clickable: true,
  },
});

const mapSwiper = new Swiper("#map-swiper", {
  modules: [Navigation, Pagination],
  slidesPerView: "auto",
  slidesOffsetAfter: 60,
  pagination: {
    el: "#map-swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: '#map-swiper-btn-next',
    prevEl: '#map-swiper-btn-prev',
    clickable: true,
  },
});

const journeySwiper = new Swiper("#journey-swiper", {
  modules: [Navigation, Scrollbar],
  slidesPerView: "auto",
  slidesOffsetAfter: 50,
  // Navigation arrows
  navigation: {
    nextEl: '#journey-swiper-btn-next',
    prevEl: '#journey-swiper-btn-prev',
  },
  // And if we need scrollbar
  scrollbar: {
    el: '#journey-swiper-scrollbar',
    draggable: true,
    hide: true,
  },
});
