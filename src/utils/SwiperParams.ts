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
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  slidesPerView: 1,
  spaceBetween: 50,
  zoom: true,
};
