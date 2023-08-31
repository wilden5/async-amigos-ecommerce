import { Image } from '@commercetools/platform-sdk';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import DOMHelpers from '../../utils/DOMHelpers';
import Constants from '../../utils/Constants';
import Component from '../templates/Component';

class Slider extends Component {
  public swiperSlide: string;

  public images: Image[];

  constructor() {
    super('div', 'className');
    this.swiperSlide = '';
    this.images = [];
  }

  public generateSwiperContent(images: Image[]): string {
    images.forEach((imageObject): void => {
      this.swiperSlide += `
      <div class="swiper-slide">
        <div class="swiper-zoom-container">
          <img class="${Constants.PRODUCT_IMAGE_CLASSNAME}" src="${imageObject.url}" alt="${
            imageObject.label || Constants.IMAGE_NOT_FOUND_LABEL
          }">
        </div>
      </div>`;
    });
    return this.swiperSlide;
  }

  public buildSwiperContainer(images: Image[]): HTMLElement {
    const swiperContainer: HTMLElement = DOMHelpers.createElement('div', { className: 'swiper mySwiper' });
    swiperContainer.innerHTML = `
      <div class="swiper-wrapper">${this.generateSwiperContent(images)}</div>
      <div class="swiper-pagination"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    `;

    return swiperContainer;
  }

  private swiperParams: SwiperOptions = {
    direction: 'horizontal',
    slidesPerView: 1,
    spaceBetween: 50,
    enabled: true,
    loop: true,
    initialSlide: 0,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: true,
    zoom: true,
    modules: [Navigation, Pagination, Scrollbar],
  };

  private swiper = new Swiper('.mySwiper', this.swiperParams);

  public initSwiper(): void {
    this.swiper.init();
    this.swiper.setGrabCursor();
  }
}

export default Slider;
