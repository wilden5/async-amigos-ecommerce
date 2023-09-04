import { Image, Product } from '@commercetools/platform-sdk';
import Swiper from 'swiper';
import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import Constants from '../../utils/Constants';
import QueryDetails from '../../backend/products/QueryProductDetails';
import DOMHelpers from '../../utils/DOMHelpers';
import PromiseHelpers from '../../utils/PromiseHelpers';
import ProductCardBuilder from '../catalog-page/ProductCardBuilder';
import Slider from '../../components/slider/Slider';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import CategoryPage from '../category-page/CategoryPage';
import { SwiperParams } from '../../utils/SwiperParams';

class ProductDetailsPage extends Page {
  private readonly PRODUCT_PAGE_ID: string;

  private readonly SLIDER = new Slider();

  private PRODUCT_TYPE_ID = '';

  private PRODUCT_PAGE_MARKUP = `
    <div class='breadcrumb'></div>
    <div class="product-details-container"></div>
  `;

  private DIALOG_MARKUP = `
      <div class="dialog-content"></div>
      <button class="dialog-close">
        <span></span>
        <span></span>
      </button>
  `;

  private IMAGES_ARRAY: Image[] = [];

  constructor(pageId: string) {
    super(ProjectPages.ProductDetails);
    this.PRODUCT_PAGE_ID = pageId;
  }

  private buildProductDetails(product: Product, parentContainer: HTMLDivElement): void {
    const productElement: HTMLElement = DOMHelpers.createElement('div', {
      className: `${this.PRODUCT_PAGE_ID} ${Constants.PRODUCT_CONTENT_CLASSNAME}`,
    });
    const usLocaleKey = 'en-US';
    const productKey: string = product.key as string;
    const productName: string = product.masterData.current.name[usLocaleKey];
    const productDescription: string | undefined = product.masterData.current.description?.[usLocaleKey];
    this.IMAGES_ARRAY = product.masterData.current.masterVariant.images as Image[];
    const productPriceContainer = ProductCardBuilder.appendPriceContainer(
      ProductCardBuilder.getProductPrice(product),
      ProductCardBuilder.getProductDiscountedPrice(product),
    );

    const swiperWrapper = this.SLIDER.buildSwiperContainer(this.IMAGES_ARRAY);

    productElement.innerHTML = `
      <div class="${productKey} ${Constants.PRODUCT_TEXT_CLASSNAME}">
        <h2 class="${productKey} ${Constants.PRODUCT_TITLE_CLASSNAME}">${productName}</h2>
        <p class="${productKey} ${Constants.PRODUCT_DESCRIPTION_CLASSNAME}">${
          productDescription || Constants.PRODUCT_DESCRIPTION_NOT_FOUND
        }</p>
        <div class="${Constants.PRICE_CONTAINER_CLASSNAME}">${productPriceContainer}</div>
        <a class=${Constants.PRODUCT_BUTTON_CLASSNAME}>${Constants.CART_BUTTON_TEXT}</a>
      </div>
    `;
    productElement.prepend(swiperWrapper);
    parentContainer.appendChild(productElement);
    this.SLIDER.initSwiper();

    (this.CONTAINER.querySelector('.swiper-wrapper') as HTMLElement).addEventListener('click', this.initModal);
  }

  private fillProductDetails(): void {
    const productContainer = this.CONTAINER.querySelector('.product-details-container') as HTMLDivElement;
    new QueryDetails()
      .queryProductDetails(this.PRODUCT_PAGE_ID)
      .then((queriedProductDetails: Product): void => {
        this.buildProductDetails(queriedProductDetails, productContainer);
        this.PRODUCT_TYPE_ID = queriedProductDetails.productType.id;
      })
      .then(() => {
        this.setBreadcrumb();
      })
      .catch((error: Error): void => {
        PromiseHelpers.catchBlockHelper(error, Constants.FETCH_PRODUCT_ERROR);
      });
  }

  private initModal = (): void => {
    const productDetailsContainer = this.CONTAINER.querySelector('.product-details-container') as HTMLElement;
    const dialogContainer = DOMHelpers.createElement('div', { className: 'dialog-container' }, productDetailsContainer);
    dialogContainer.innerHTML = this.DIALOG_MARKUP;

    const modalSwiperContainer = DOMHelpers.createElement(
      'div',
      { className: 'swiper-container swiper-modal' },
      dialogContainer,
    );

    modalSwiperContainer.innerHTML = '';

    modalSwiperContainer.innerHTML = `
    <div class="swiper-wrapper">${this.SLIDER.generateSwiperContent(this.IMAGES_ARRAY)}</div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <div class="swiper-pagination"></div>
  `;

    const swiperModal = new Swiper('.swiper-modal', SwiperParams) as Swiper | null;

    if (swiperModal) {
      swiperModal.init();
    }

    (this.CONTAINER.querySelector('.dialog-close') as HTMLButtonElement).addEventListener('click', (): void => {
      dialogContainer.remove();

      if (swiperModal) {
        swiperModal.destroy();
      }
    });
  };

  // private initModal = (): void => {
  //   const productDetailsContainer = this.CONTAINER.querySelector('.product-details-container') as HTMLElement;
  //   const dialogContainer = DOMHelpers.createElement('div', { className: 'dialog-container' }, productDetailsContainer);
  //   dialogContainer.innerHTML = this.DIALOG_MARKUP;
  //
  //   // const swiperModal = new Slider();
  //   const swiperModal = new Swiper('.swiper-modal', SwiperParams) as Swiper | null;
  //   const swiperMarkup = this.SLIDER.buildSwiperContainer(this.IMAGES_ARRAY);
  //
  //   (this.CONTAINER.querySelector('.dialog-content') as HTMLElement).appendChild(swiperMarkup);
  //   (this.CONTAINER.querySelector('.dialog-close') as HTMLButtonElement).addEventListener('click', (): void => {
  //     dialogContainer.remove();
  //
  //     if (swiperModal) {
  //       swiperModal.destroy();
  //     }
  //   });
  //   if (swiperModal) {
  //     swiperModal.init();
  //   }
  //   // swiperModal.initSwiper();
  // };

  private setBreadcrumb(): void {
    const productTitleElementText = (this.CONTAINER.querySelector('.product-title') as HTMLElement)
      .textContent as string;
    Breadcrumbs.setProductBreadcrumb(
      this.CONTAINER,
      `${CategoryPage.categoryNames[this.PRODUCT_TYPE_ID]}`,
      `#category/${this.PRODUCT_TYPE_ID}`,
      productTitleElementText,
      `#product/${this.PRODUCT_PAGE_ID}`,
    );
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.PRODUCT_PAGE_MARKUP;
    this.fillProductDetails();
    return this.CONTAINER;
  }
}

export default ProductDetailsPage;
