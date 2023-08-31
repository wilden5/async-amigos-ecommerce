import { Image } from '@commercetools/platform-sdk';
import Swiper from 'swiper';
import { SwiperOptions } from 'swiper/types';
import { Navigation, Pagination } from 'swiper/modules';
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
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-pagination"></div>
    `;

    return swiperContainer;
  }

  private disableSwiper(): boolean {
    return true;
  }

  private swiperParams: SwiperOptions = {
    direction: 'horizontal',
    enabled: this.disableSwiper(),
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

  private swiper = new Swiper('.mySwiper', this.swiperParams) as Swiper | null;

  public destroy(): void {
    if (this.swiper) {
      this.swiper.destroy();
      this.swiper = null;
    }
  }

  public initSwiper(): void {
    if (this.swiper) {
      this.swiper.init();
    }
    if (this.images.length <= 1) {
      this.disableSwiper = (): boolean => false;
    }
  }
}

export default Slider;
