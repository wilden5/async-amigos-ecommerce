import { ProductProjection } from '@commercetools/platform-sdk';
import { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import Breadcrumbs from '../../components/breadcrumbs/Breadcrumbs';
import { CategoryNames } from '../../types/Interfaces';
import ProductProjectionSearch from '../../backend/products/ProductProjectionSearch';
import ProductCardBuilder from '../catalog-page/ProductCardBuilder';
import PromiseHelpers from '../../utils/PromiseHelpers';
import Constants from '../../utils/Constants';

class CategoryPage extends page {
  private readonly CATEGORY_PAGE_ID: string;

  static categoryNames: CategoryNames = {
    '960b60fa-218f-489c-a020-9b31b8455432': 'CPU',
    '81db6b93-b245-4af8-aa43-b729c6693ecf': 'GPU',
    'f27f2203-b464-4f69-9645-8ed2bf2b1bf1': 'RAM',
    '9f1fc1c6-87ca-42a8-b9e4-27640c8672d9': 'Motherboard',
    '3d9b7ca9-3181-40bc-b4b4-da78f425a3ef': 'SSD',
    '5385478d-c46f-4a36-8948-c71b617c5458': 'HDD',
    '49660086-620e-4651-95f2-6cdffa272842': 'Computer Case',
    '182e31f0-f31f-4ca9-b1ea-cd0f5e9d9972': 'PSU',
    '6c35728c-69a4-4e5f-9298-e6b45adff3ec': 'Computer Coolers',
  };

  private CATEGORY_PAGE_MARKUP = `
    <div class="category-container">
      <h1 class='page-title'>Category Page</h1>
      <div class='breadcrumb'></div>
      <div class='product-container'></div>
    </div>`;

  constructor(pageId: string) {
    super(ProjectPages.Category);
    this.CATEGORY_PAGE_ID = pageId;
  }

  private populateCategory(): void {
    new ProductProjectionSearch()
      .searchProductCatalog(`productType.id:"${this.CATEGORY_PAGE_ID}"`)
      .then((queriedProductList: ProductProjectionPagedSearchResponse): void => {
        const productContainer = this.CONTAINER.querySelector('.product-container') as HTMLElement;

        queriedProductList.results.forEach((product: ProductProjection): void => {
          ProductCardBuilder.buildProductCard(product, productContainer);
        });
      })
      .catch((error: Error): void => {
        PromiseHelpers.catchBlockHelper(error, Constants.FETCH_CATALOG_ERROR);
      });
  }

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

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.CATEGORY_PAGE_MARKUP;
    this.populateCategory();
    this.onProductClick();
    Breadcrumbs.setCategoryBreadcrumb(
      this.CONTAINER,
      CategoryPage.categoryNames[this.CATEGORY_PAGE_ID],
      `#category/${this.CATEGORY_PAGE_ID}`,
    );
    return this.CONTAINER;
  }
}

export default CategoryPage;
