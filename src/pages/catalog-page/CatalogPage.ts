import { Product, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import QueryProducts from '../../backend/products/QueryProducts';
import Constants from '../../utils/Constants';
import TostifyHelper from '../../utils/TostifyHelper';
import DOMHelpers from '../../utils/DOMHelpers';
import QueryDetails from '../../backend/products/QueryProductDetails';

class CatalogPage extends Page {
  private CATALOG_PAGE_MARKUP = `
     <h1 class='page-title'>Search results:</h1>
     <div class='product-container'></div>`;

  constructor() {
    super(ProjectPages.Catalog);
  }

  private buildProductCard(product: Product, parentContainer: HTMLDivElement): void {
    const usLocaleKey = 'en-US';
    const productElement = DOMHelpers.createElement('div', {
      className: `${product.id} ${Constants.PRODUCT_ITEM_CLASSNAME}`,
    }) as Element;
    const productKey = product.key as string;
    const productName = product.masterData.current.name[usLocaleKey];
    const productDescription = product.masterData.current.description?.[usLocaleKey];
    const { url: imageURL, label: imageLabel } = product.masterData.current.masterVariant.images?.[0] ?? {
      url: '',
      label: Constants.IMAGE_NOT_FOUND_LABEL,
    };
    productElement.innerHTML = `
            <img class="${productKey} ${Constants.PRODUCT_IMAGE_CLASSNAME}" src="${imageURL}" alt="${
              imageLabel || Constants.IMAGE_NOT_FOUND_LABEL
            }">
            <h2 class="${productKey} ${Constants.PRODUCT_TITLE_CLASSNAME}">${productName}</h2>
            <p class="${productKey} ${Constants.PRODUCT_DESCRIPTION_CLASSNAME}">${
              productDescription || Constants.PRODUCT_DESCRIPTION_NOT_FOUND
            }</p> <a class=${Constants.PRODUCT_BUTTON_CLASSNAME} href=#product/${productKey}>ADD TO CART</a>`;
    parentContainer.appendChild(productElement);
  }

  private fillProductCatalog(): void {
    const productContainer = this.CONTAINER.querySelector('.product-container') as HTMLDivElement;
    new QueryProducts()
      .queryProductList()
      .then((queriedProductList: ProductPagedQueryResponse): void => {
        queriedProductList.results.forEach((product: Product): void => {
          this.buildProductCard(product, productContainer);
        });
      })
      .catch((error: Error): void => {
        const errorMessage: string =
          error.message === Constants.FAILED_TO_FETCH_ERROR_MESSAGE ? Constants.FETCH_CATALOG_ERROR : error.message;
        TostifyHelper.showToast(errorMessage, Constants.TOAST_COLOR_RED);
      });
  }

  private getProductClicked(): void {
    this.CONTAINER.addEventListener('click', (event: Event): void => {
      const productClicked = event.target as Element | null;
      const productItem = productClicked?.closest('.product-item') as Element | null;
      const details: QueryDetails = new QueryDetails();

      if (productItem) {
        details
          .queryProductDetails(productItem.classList[0])
          .then((): void => {})
          .catch((error: Error): void => {
            throw new Error('Error fetching product details:', error);
          });
      }
    });
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.CATALOG_PAGE_MARKUP;
    this.fillProductCatalog();
    this.getProductClicked();
    return this.CONTAINER;
  }
}

export default CatalogPage;
