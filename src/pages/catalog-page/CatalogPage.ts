import { Product } from '@commercetools/platform-sdk';
import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import QueryProducts from '../../backend/products/QueryProducts';
import Constants from '../../utils/Constants';
import TostifyHelper from '../../utils/TostifyHelper';
import DOMHelpers from '../../utils/DOMHelpers';

class CatalogPage extends Page {
  private CATALOG_PAGE_MARKUP = `
     <h1 class='page-title'>Search results:</h1>
     <div class='product-container'></div>`;

  constructor() {
    super(ProjectPages.Catalog);
  }

  private convertProductPrice(price: number): string {
    if (price !== undefined) {
      const dollars = Math.floor(price / 100);
      const cents = (price % 100).toString().padStart(2, '0');
      return `${dollars}.${cents}$`;
    }
    return '0';
  }

  private getProductPrice(product: Product): string {
    const priceInCents = product.masterData.current.masterVariant.prices?.[0].value.centAmount as number;
    return this.convertProductPrice(priceInCents);
  }

  private getProductDiscountedPrice(product: Product): string {
    const discountedPriceInCents = product.masterData.current.masterVariant.prices?.[0].discounted?.value
      .centAmount as number;
    return this.convertProductPrice(discountedPriceInCents);
  }

  private buildPriceContainer(productPrice: string, productDiscountedPrice: string): string {
    if (productPrice && Number(productDiscountedPrice.split('$')[0]) > 0) {
      return `<div class='price-container'>
        <span class='product-price'>${productPrice}</span>
        <span class='product-discounted-price'>${productDiscountedPrice}</span>
        <div/>`;
    }
    return `<div class='price-container'>
      <span class='product-price'>${productPrice}</span>
      <div/>`;
  }

  private buildProductCard(product: Product, parentContainer: HTMLDivElement): void {
    const usLocaleKey = 'en-US';
    const productElement = DOMHelpers.createElement('div', {
      className: `${product.id} ${Constants.PRODUCT_ITEM_CLASSNAME}`,
    });
    const productKey = product.key as string;
    const productName = product.masterData.current.name[usLocaleKey];
    const productDescription = product.masterData.current.description?.[usLocaleKey];
    const { url: imageURL, label: imageLabel } = product.masterData.current.masterVariant.images?.[0] ?? {
      url: '',
      label: Constants.IMAGE_NOT_FOUND_LABEL,
    };
    const productPriceContainer = this.buildPriceContainer(
      this.getProductPrice(product),
      this.getProductDiscountedPrice(product),
    );
    productElement.innerHTML = `
            <img class="${productKey} ${Constants.PRODUCT_IMAGE_CLASSNAME}" src="${imageURL}" alt="${
              imageLabel || Constants.IMAGE_NOT_FOUND_LABEL
            }">
            <h2 class="${productKey} ${Constants.PRODUCT_TITLE_CLASSNAME}">${productName}</h2>
            <p class="${productKey} ${Constants.PRODUCT_DESCRIPTION_CLASSNAME}">${
              productDescription || Constants.PRODUCT_DESCRIPTION_NOT_FOUND
            }</p> ${productPriceContainer} <a class=${
              Constants.PRODUCT_BUTTON_CLASSNAME
            } href=#product/${productKey}>ADD TO CART</a>`;
    parentContainer.appendChild(productElement);
  }

  private fillProductCatalog(): void {
    const productContainer = this.CONTAINER.querySelector('.product-container') as HTMLDivElement;
    new QueryProducts()
      .queryProductList()
      .then((queriedProductList) => {
        queriedProductList.results.forEach((product) => {
          this.buildProductCard(product, productContainer);
        });
      })
      .catch((error: Error) => {
        const errorMessage: string =
          error.message === Constants.FAILED_TO_FETCH_ERROR_MESSAGE ? Constants.FETCH_CATALOG_ERROR : error.message;
        TostifyHelper.showToast(errorMessage, Constants.TOAST_COLOR_RED);
      });
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.CATALOG_PAGE_MARKUP;
    this.fillProductCatalog();
    return this.CONTAINER;
  }
}

export default CatalogPage;
