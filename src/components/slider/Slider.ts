import DOMHelpers from '../../utils/DOMHelpers';
import Page from '../templates/Page';
import { ProjectPages } from '../../types/Enums';
import Constants from '../../utils/Constants';

class Slider extends Page {
  private images: string[];

  private currentSlideIndex: number;

  constructor(images: string[]) {
    super(ProjectPages.ProductDetails);
    this.images = images;
    this.currentSlideIndex = 0;
  }

  private createSlide(imageURL: string, imageLabel: string): HTMLElement {
    const slide: HTMLElement = DOMHelpers.createElement('div', {
      className: 'swiper-slide mySwiper__item',
    });
    slide.innerHTML = `
     <img class="${Constants.PRODUCT_IMAGE_CLASSNAME}" src="${imageURL}" alt="${
       imageLabel || Constants.IMAGE_NOT_FOUND_LABEL
     }">
    `;
    return slide;
  }

  private createControlButton(text: string, onClick: () => void): HTMLElement {
    const button: HTMLElement = DOMHelpers.createElement('button', {
      className: 'mySwiper-control-btn',
      textContent: text,
    });
    button.addEventListener('click', onClick);
    return button;
  }

  private showSlide(index: number): void {
    const slides: NodeListOf<Element> = this.CONTAINER.querySelectorAll('.swiper-slide');
    slides.forEach((slide: Element, idx: number): void => {
      slide.classList.toggle('active', idx === index);
    });
    this.currentSlideIndex = index;
  }

  private createSliderContainer(): HTMLElement {
    const slidesContainer: HTMLElement = DOMHelpers.createElement('div', {
      className: 'swiper-container mySwiper__list',
    });
    const pagination: HTMLElement = DOMHelpers.createElement('div', {
      className: 'swiper-pagination',
    });
    const navigation: HTMLElement = DOMHelpers.createElement('div', {
      className: 'swiper-button-next',
    });
    const prevButton: HTMLElement = this.createControlButton('<', (): void => {
      const newIndex: number = (this.currentSlideIndex - 1 + this.images.length) % this.images.length;
      this.showSlide(newIndex);
    });
    const nextButton: HTMLElement = this.createControlButton('>', (): void => {
      const newIndex: number = (this.currentSlideIndex + 1) % this.images.length;
      this.showSlide(newIndex);
    });
    slidesContainer.appendChild(pagination);
    slidesContainer.appendChild(navigation);
    slidesContainer.appendChild(prevButton);
    slidesContainer.appendChild(nextButton);
    return slidesContainer;
  }

  public render(): HTMLElement {
    const slider: HTMLElement = this.createSliderContainer();
    this.images.forEach((imageURL: string): void => {
      const slide: HTMLElement = this.createSlide(imageURL, '');
      slider.appendChild(slide);
    });
    this.showSlide(0);
    return slider;
  }
}

export default Slider;

// import DOMHelpers from '../../utils/DOMHelpers';
// import Page from '../templates/Page';
// import { ProjectPages } from '../../types/Enums';
// import Constants from '../../utils/Constants';
// import { Product } from '@commercetools/platform-sdk';
//
// class Slider extends Page {
//   private images: string[];
//
//   private currentsSlideIndex: number;
//
//   constructor(images: string[]) {
//     super(ProjectPages.ProductDetails);
//     this.images = images;
//     this.currentsSlideIndex = 0;
//   }
//
//   private getAllProductImages(product: Product): void {
//     const { url: imageURL, label: imageLabel } = product.masterData.current.masterVariant.images? {
//       url: Constants.IMAGE_NOT_FOUND_MOCK_IMAGE,
//       label: Constants.IMAGE_NOT_FOUND_LABEL,
//     };
//   }
//
//   private createSlide(imgURL: string): HTMLElement {
//     const slide: HTMLElement = DOMHelpers.createElement('swiper-slide', { className: 'mySwiper__item' });
//     slide.innerHTML = `
//      <img class="${productKey} ${Constants.PRODUCT_IMAGE_CLASSNAME}" src="${imageURL}" alt="${
//       imageLabel || Constants.IMAGE_NOT_FOUND_LABEL
//     }">
//     `;
//     return slide;
//   }
//
//   private createControlButton(text: string, onClick: () => void): HTMLElement {
//     const sliderBtn: HTMLElement = DOMHelpers.createElement('button', {
//       className: 'mySwiper-control-btn',
//       textContent: text,
//     });
//     sliderBtn.addEventListener('click', onClick);
//     return sliderBtn;
//   }
//
//   private showSlide(index: number): void {
//     const slides: NodeListOf<Element> = this.CONTAINER.querySelectorAll('.swiper-slide');
//     slides.forEach((slide: Element, idx: number): void => {
//       slide.classList.toggle('active', idx === index);
//     });
//     this.currentsSlideIndex = index;
//   }
//
//   private setAttributes(element: HTMLElement, attributes: { [key: string]: string }): void {
//     Object.entries(attributes).forEach(([key, value]): void => {
//       element.setAttribute(key, value);
//     });
//   }
//
//   private createSliderContainer(): HTMLElement {
//     const slidesContainer: HTMLElement = DOMHelpers.createElement('swiper-container', { className: 'mySwiper__list' });
//     this.setAttributes(slidesContainer, {
//       'pagination': 'true',
//       'pagination-type': 'progressbar',
//       'navigation': 'true',
//     });
//     return slidesContainer;
//   }
//
//   public render(): HTMLElement {
//     const slider: HTMLElement = this.createSliderContainer();
//     this.images.forEach((imageURL: string): void => {
//       const slide: HTMLElement = this.createSlide(imageURL);
//       slider.appendChild(slide);
//     });
//
//     const prevButton: HTMLElement = this.createControlButton('<', (): void => {
//       const newIndex: number = (this.currentsSlideIndex - 1 + this.images.length) % this.images.length;
//       this.showSlide(newIndex);
//     });
//
//     const nextButton: HTMLElement = this.createControlButton('>', (): void => {
//       const newIndex: number = (this.currentsSlideIndex + 1) % this.images.length;
//       this.showSlide(newIndex);
//     });
//     slider.appendChild(prevButton);
//     slider.appendChild(nextButton);
//
//     this.showSlide(0);
//
//     return slider;
//   }
// }
//
// export default Slider;
