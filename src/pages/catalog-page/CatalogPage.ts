import { Product, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import QueryProducts from '../../backend/products/QueryProducts';
import Constants from '../../utils/Constants';
import PromiseHelpers from '../../utils/PromiseHelpers';
import CatalogPageFilters from './CatalogPageFilters';
import ProductCardBuilder from './ProductCardBuilder';

class CatalogPage extends Page {
  private CATALOG_PAGE_MARKUP = `
    <div class="catalog__container">
      <h1 class='page-title'>Search results:</h1>
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
        <button class='reset-filter-button'>Reset Filter</button>
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

  private onProductClick(): void {
    this.CONTAINER.addEventListener('click', (event: Event): void => {
      const productClicked = event.target as Element | null;
      const productItem = productClicked?.closest('.product-item') as Element | null;

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

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.CATALOG_PAGE_MARKUP;
    this.fillProductCatalog();
    this.onProductClick();
    CatalogPageFilters.initAllFilters(this.CONTAINER, this.fillProductCatalog);
    this.onResetFiltersButtonClick();
    return this.CONTAINER;
  }
}

export default CatalogPage;
