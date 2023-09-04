import { Image } from '@commercetools/platform-sdk';
import Swiper from 'swiper';
import { SwiperParams } from '../../utils/SwiperParams';
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
    this.swiperSlide = '';

    images.forEach((imageObject): void => {
      this.swiperSlide += `
      <div class="swiper-slide">
        <img class="${Constants.PRODUCT_IMAGE_CLASSNAME}" src="${imageObject.url}" alt="${
          imageObject.label || Constants.IMAGE_NOT_FOUND_LABEL
        }">
      </div>`;
    });
    return this.swiperSlide;
  }

  public buildSwiperContainer(images: Image[]): HTMLElement {
    const swiperContainer: HTMLElement = DOMHelpers.createElement('div', { className: 'swiper mySwiper' });
    swiperContainer.innerHTML = `
      <div class="swiper-wrapper">${this.generateSwiperContent(images)}</div>
      <div class="swiper-button-next swiper-main-button-next"></div>
      <div class="swiper-button-prev swiper-main-button-prev"></div>
      <div class="swiper-pagination swiper-main-pagination"></div>
    `;

    return swiperContainer;
  }

  private swiper = new Swiper('.mySwiper', SwiperParams) as Swiper | null;

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
  }
}

export default Slider;
