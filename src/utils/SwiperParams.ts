import { SwiperOptions } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';

export const SwiperParams: SwiperOptions = {
  direction: 'horizontal',
  grabCursor: true,
  initialSlide: 0,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  loop: true,
  modules: [Navigation, Pagination],
  navigation: {
    nextEl: '.swiper-main-button-next',
    prevEl: '.swiper-main-button-prev',
  },
  pagination: {
    el: '.swiper-main-pagination',
    clickable: true,
  },
  slidesPerView: 1,
  spaceBetween: 50,
  zoom: true,
};

export const SwiperModalParams: SwiperOptions = {
  direction: 'horizontal',
  grabCursor: true,
  initialSlide: 0,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  loop: true,
  modules: [Navigation, Pagination],
  navigation: {
    nextEl: '.swiper-modal-button-next',
    prevEl: '.swiper-modal-button-prev',
  },
  pagination: {
    el: '.swiper-modal-pagination',
    clickable: true,
  },
  slidesPerView: 1,
  spaceBetween: 50,
  zoom: true,
};
