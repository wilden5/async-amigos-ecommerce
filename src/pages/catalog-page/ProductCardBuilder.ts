import { Product, ProductProjection } from '@commercetools/platform-sdk';
import DOMHelpers from '../../utils/DOMHelpers';
import Constants from '../../utils/Constants';

class ProductCardBuilder {
  static convertProductPrice(price: number): string {
    if (price !== undefined) {
      const dollars = Math.floor(price / 100);
      const cents = (price % 100).toString().padStart(2, '0');
      return `${dollars}.${cents}$`;
    }
    return '0';
  }

  static getProductPrice(product: Product | ProductProjection): string {
    let priceInCents: number;

    if ('masterData' in product) {
      priceInCents = product.masterData.current.masterVariant.prices?.[0].value.centAmount as number;
    } else {
      priceInCents = product.masterVariant.prices?.[0].value.centAmount as number;
    }
    return this.convertProductPrice(priceInCents);
  }

  static getProductDiscountedPrice(product: Product | ProductProjection): string {
    let discountedPriceInCents: number;

    if ('masterData' in product) {
      discountedPriceInCents = product.masterData.current.masterVariant.prices?.[0].discounted?.value
        .centAmount as number;
    } else {
      discountedPriceInCents = product.masterVariant.prices?.[0].discounted?.value.centAmount as number;
    }
    return this.convertProductPrice(discountedPriceInCents);
  }

  static appendPriceContainer(productPrice: string, productDiscountedPrice: string): string {
    if (productPrice && Number(productDiscountedPrice.split('$')[0]) > 0) {
      return `<span class='product-price price-strikethrough'>${productPrice}</span>
              <span class='product-discounted-price'>${productDiscountedPrice}</span>`;
    }
    return `<span class='product-price'>${productPrice}</span>`;
  }

  static buildProductCard(product: Product | ProductProjection, parentContainer: HTMLElement): void {
    const usLocaleKey = 'en-US';
    const productElement = DOMHelpers.createElement('div', {
      className: `${product.id} ${Constants.PRODUCT_ITEM_CLASSNAME}`,
    }) as Element;
    let productKey;
    let productName;
    let productDescription;
    let imageURL;
    let imageLabel;

    if ('masterData' in product) {
      productKey = product.key as string;
      productName = product.masterData.current.name[usLocaleKey];
      productDescription = product.masterData.current.description?.[usLocaleKey];
      imageURL = product.masterData.current.masterVariant.images?.[0].url ?? Constants.IMAGE_NOT_FOUND_MOCK_IMAGE;
      imageLabel = product.masterData.current.masterVariant.images?.[0].label ?? Constants.IMAGE_NOT_FOUND_LABEL;
    } else {
      productKey = product.key as string;
      productName = product.name[usLocaleKey];
      productDescription = product.description?.[usLocaleKey];
      imageURL = product.masterVariant.images?.[0].url ?? Constants.IMAGE_NOT_FOUND_MOCK_IMAGE;
      imageLabel = product.masterVariant.images?.[0].label ?? Constants.IMAGE_NOT_FOUND_LABEL;
    }
    const productPriceContainer = this.appendPriceContainer(
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
            }</p> 
            <div class='${Constants.PRICE_CONTAINER_CLASSNAME}'>${productPriceContainer}</div>
            <a class="${product.id} ${Constants.PRODUCT_BUTTON_CLASSNAME}">${Constants.CART_BUTTON_ADD_TEXT}</a>`;
    parentContainer.appendChild(productElement);
  }
}

export default ProductCardBuilder;
