import { ProductProjection } from '@commercetools/platform-sdk';
import { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import Page from '../../components/templates/Page';
import Constants from '../../utils/Constants';
import ProductProjectionSearch from '../../backend/products/ProductProjectionSearch';
import ProductCardBuilder from '../catalog-page/ProductCardBuilder';
import PromiseHelpers from '../../utils/PromiseHelpers';

class HomePage extends Page {
  private HOME_PAGE_MARKUP = `
    <div class="home-container">
        <h1 class='home-page-title'>Discover Amazing Discounts, Dive into Savings!</h1>
        <div class='special-offers'></div>
        <a href="#catalog" class="explore-button">Explore our catalog</a>
    </div>  
`;

  constructor() {
    super(Constants.HOME_PAGE_SELECTOR);
  }

  private homePageSpecialDeals(): void {
    const specialDeals: ProductProjection[] = [];
    new ProductProjectionSearch()
      .searchProductCatalog()
      .then((queriedProductList: ProductProjectionPagedSearchResponse) => {
        queriedProductList.results.forEach((product: ProductProjection) => {
          if (product.masterVariant.prices && product.masterVariant.prices[0].discounted) {
            specialDeals.push(product);
          }
        });
      })
      .then(() =>
        specialDeals.forEach((product: ProductProjection) => {
          ProductCardBuilder.buildProductCard(product, this.CONTAINER.querySelector('.special-offers') as HTMLElement);
        }),
      )
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
    this.CONTAINER.innerHTML = this.HOME_PAGE_MARKUP;
    this.homePageSpecialDeals();
    this.onProductClick();
    return this.CONTAINER;
  }
}

export default HomePage;
