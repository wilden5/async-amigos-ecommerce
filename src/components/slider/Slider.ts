import { Image } from '@commercetools/platform-sdk';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/navigation';
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
    images.forEach((imageObject) => {
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
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    `;

    return swiperContainer;
  }

  private swiper = new Swiper('.mySwiper', {
    direction: 'horizontal',
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    modules: [Navigation],
  });

  public initSwiper(): void {
    this.swiper.init();
  }

  // public renderComponent(): HTMLElement {
  //   return this.buildSwiperContainer(this.images);
  // }
}

export default Slider;
