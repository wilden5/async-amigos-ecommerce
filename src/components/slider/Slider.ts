import { Image } from '@commercetools/platform-sdk';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import DOMHelpers from '../../utils/DOMHelpers';
import Page from '../templates/Page';
import { ProjectPages } from '../../types/Enums';
import Constants from '../../utils/Constants';

class Slider extends Page {
  private readonly images: Image[];

  private swiperSlide: string;

  constructor(images: Image[]) {
    super(ProjectPages.ProductDetails);
    this.images = images;
    this.swiperSlide = '';
  }

  public swiper = new Swiper('.mySwiper', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  private generateSwiperContent(images: Image[]): string {
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

  private buildSwiperContainer(): HTMLElement {
    const swiperContainer: HTMLElement = DOMHelpers.createElement('div', { className: 'swiper mySwiper' });
    swiperContainer.innerHTML = `
      <div class="swiper-wrapper">${this.generateSwiperContent(this.images)}</div>
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    `;
    return swiperContainer;
  }

  public render(): HTMLElement {
    const swiperContainer = this.buildSwiperContainer();

    this.swiper = new Swiper(swiperContainer, {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    return swiperContainer;
  }
}

export default Slider;
