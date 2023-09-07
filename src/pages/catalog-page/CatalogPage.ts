import {
  Product,
  ProductPagedQueryResponse,
  ProductType,
  ProductTypePagedQueryResponse,
} from '@commercetools/platform-sdk';
import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import QueryProducts from '../../backend/products/QueryProducts';
import Constants from '../../utils/Constants';
import PromiseHelpers from '../../utils/PromiseHelpers';
import CatalogPageFilters from './CatalogPageFilters';
import ProductCardBuilder from './ProductCardBuilder';
import CatalogPageSort from './CatalogPageSort';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import DOMHelpers from '../../utils/DOMHelpers';
import CustomerCart from '../../backend/cart/CustomerCart';
import LocalStorage from '../../utils/LocalStorage';

class CatalogPage extends Page {
  private CATALOG_PAGE_MARKUP = `
    <div class="catalog__container">
      <div class='breadcrumb'></div>
      <div class='categories-container'>
        <h2 class='categories-header'>Our Categories:</h2>
        <div class='categories-links'></div>
      </div>
      <div class='catalog-filters'>
      <div class='filters-wrapper'>
        <div class="price-filter filter">
          <h2 class='filter-header'>Price range</h2>
          <div class='price-wrapper'>
          <input type="number" class="price-min price-inp" min='0' max='9999' placeholder='Min'>
          <input type="number" class="price-max price-inp" min='0' max='9999' placeholder='Max'>
            </div>
       </div>
       <div class="brand-filter filter">
          <h2 class='filter-header'>Brand</h2>
          <select class="brand-select filter-select">
            <option value="brand-default" selected disabled>Select brand</option>
          </select>
        </div>
        <div class="type-filter filter">
          <h2 class='filter-header'>Type</h2>
          <select class="type-select filter-select">
            <option value="type-default" selected disabled>Select type</option>
         </select>
        </div>
        <div class="launch-date-filter filter">
          <h2 class='filter-header'>Launch date</h2>
          <select class="type-launch-date filter-select">
            <option value="type-default" selected disabled>Select Launch date</option>
         </select>
        </div>
        <div class="on-sale-filter filter">
          <h2 class='filter-header'>On sale</h2>
          <input class='on-sale-checkbox' type='checkbox'>
        </div>
        <button class='reset-filter-button'>Reset Filter/Sort</button>
        </div>
      </div>
       <div class="sorting-block">
          <div class="sorting-options">
            <select class="sort-by">
              <option class='sort-option' value="price-def" selected disabled>Sort Catalog By</option>
              <option class='sort-option' value="price asc">Price (ascending)</option>
              <option class='sort-option' value="price desc">Price (descending)</option>
              <option class='sort-option' value="name.en-us asc">Name (alphabetically)</option>
              <option class='sort-option' value="name.en-us desc">Name (alphabetically reversed)</option>
            </select>
           </div>
           <div class="search-container">
              <input class='search-field' type="text" placeholder="Search...">
           </div>
         </div>
      <div class='product-container'></div>
    </div>`;

  constructor() {
    super(ProjectPages.Catalog);
  }

  private fillProductCatalog = (): void => {
    const productContainer = this.CONTAINER.querySelector('.product-container') as HTMLDivElement;
    new QueryProducts()
      .queryProductList()
      .then((queriedProductList: ProductPagedQueryResponse): void => {
        queriedProductList.results.forEach((product: Product): void => {
          ProductCardBuilder.buildProductCard(product, productContainer);
        });
      })
      .catch((error: Error): void => {
        PromiseHelpers.catchBlockHelper(error, Constants.FETCH_CATALOG_ERROR);
      });
  };

  static onAddToCartButtonClick = (product: HTMLElement): void => {
    const productId: string = product.classList[0];
    new CustomerCart()
      .addCartItem(new LocalStorage().getLocalStorageItem('cart-id') as string, productId)
      .catch((error: Error): void => {
        PromiseHelpers.catchBlockHelper(error, Constants.FETCH_PRODUCT_TYPES_ERROR);
      });
  };

  static onProductClick(container: HTMLElement): void {
    container.addEventListener('click', (event: Event): void => {
      const clickedElement = event.target as Element;
      const productItem = clickedElement.closest('.product-item') as HTMLElement;

      if (
        clickedElement instanceof HTMLAnchorElement &&
        clickedElement.className === `${Constants.CART_BUTTON_CLASSNAME}`
      ) {
        event.preventDefault();
        this.onAddToCartButtonClick(productItem);
        return;
      }

      if (productItem) {
        const productId = productItem.classList[0];
        window.location.hash = `#product/${productId}`;
      }
    });
  }

  private onResetFiltersButtonClick(): void {
    (this.CONTAINER.querySelector('.reset-filter-button') as HTMLButtonElement).addEventListener('click', () => {
      this.renderPage();
    });
  }

  private createCategoriesLinks(): void {
    const categoriesContainer = this.CONTAINER.querySelector('.categories-links') as HTMLSelectElement;
    new QueryProducts()
      .queryProductTypes()
      .then((queriedProductTypes: ProductTypePagedQueryResponse) => {
        queriedProductTypes.results.forEach((type: ProductType) => {
          const categoryLink = DOMHelpers.createElement(
            'a',
            { className: 'category-link', textContent: type.name },
            categoriesContainer,
          ) as HTMLAnchorElement;
          categoryLink.href = `#category/${type.id}`;
        });
      })
      .catch((error: Error): void => {
        PromiseHelpers.catchBlockHelper(error, Constants.FETCH_PRODUCT_TYPES_ERROR);
      });
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.CATALOG_PAGE_MARKUP;
    this.fillProductCatalog();
    CatalogPage.onProductClick(this.CONTAINER);
    CatalogPageFilters.initAllFilters(this.CONTAINER, this.fillProductCatalog);
    CatalogPageSort.initSort(this.CONTAINER);
    this.onResetFiltersButtonClick();
    Breadcrumbs.setCatalogBreadcrumb(this.CONTAINER);
    this.createCategoriesLinks();
    return this.CONTAINER;
  }
}

export default CatalogPage;
