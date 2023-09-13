import { DiscountCodePagedQueryResponse, ProductProjection } from '@commercetools/platform-sdk';
import { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import Page from '../../components/templates/Page';
import Constants from '../../utils/Constants';
import ProductProjectionSearch from '../../backend/products/ProductProjectionSearch';
import ProductCardBuilder from '../catalog-page/ProductCardBuilder';
import PromiseHelpers from '../../utils/PromiseHelpers';
import CatalogPage from '../catalog-page/CatalogPage';
import CustomerCart from '../../backend/cart/CustomerCart';
import DiscountCodes from '../../backend/discountCodes/discountCodes';
import DOMHelpers from '../../utils/DOMHelpers';

class HomePage extends Page {
  private HOME_PAGE_MARKUP = `
    <div class="home-container">
      <h1 class="home-page-title">Discover Amazing Discounts, Dive into Savings!</h1>
      <div class="promo-container"></div>
      <div class="special-offers"></div>
      <a href="#catalog" class="explore-button">Explore our catalog</a>
    </div>  
`;

  private PROMO_TICKET_MARKUP = `
      <div class="promo promo-left">
        <h2 class="promo-title">Promo <span>Code</span></h2>
        <div class="promo-description">
          <h2>This promo gives you</h2>
          <span class="promo-discount"></span>
          <h2>Valid through</h2>
          <span class="promo-valid"></span>
        </div>
      </div>
      <div class="promo promo-right">
        <div class="eye"></div>
        <h3 class="promo-number"></h3>
        <div class="barcode"></div>
      </div>
  `;

  private CUSTOMER_CART: CustomerCart;

  constructor() {
    super(Constants.HOME_PAGE_SELECTOR);
    this.CUSTOMER_CART = new CustomerCart();
  }

  private addPromoCards(): void {
    const promoContainer = this.CONTAINER.querySelector('.promo-container') as HTMLElement;

    new DiscountCodes()
      .getDiscountCodes()
      .then((response: DiscountCodePagedQueryResponse): void => {
        response.results.forEach((result): void => {
          if (result.isActive) {
            const promoCard = DOMHelpers.createElement('div', { className: 'promo-card' });
            promoCard.innerHTML = this.PROMO_TICKET_MARKUP;

            const promoSecret = promoCard.querySelector('.promo-number') as HTMLHeadElement;
            promoSecret.innerText = result.code;

            const discountRate = promoCard.querySelector('.promo-discount') as HTMLSpanElement;
            discountRate.innerText = `Discount: ${result.code.slice(-2)}%`;

            const discountValid = promoCard.querySelector('.promo-valid') as HTMLSpanElement;
            const date: Date = new Date(result.validUntil as string);
            discountValid.innerText = `${date.toLocaleDateString()}`;

            promoContainer.appendChild(promoCard);
          }
        });
      })
      .catch((error: Error): void => {
        PromiseHelpers.catchBlockHelper(error, error.message);
      });
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
      .then(() => CatalogPage.restoreButtonState())
      .catch((error: Error): void => {
        PromiseHelpers.catchBlockHelper(error, Constants.FETCH_CATALOG_ERROR);
      });
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.HOME_PAGE_MARKUP;
    this.homePageSpecialDeals();
    this.CUSTOMER_CART.createCartOnFirstLoad().catch((error: Error): void => {
      PromiseHelpers.catchBlockHelper(error, Constants.FETCH_PRODUCT_TYPES_ERROR);
    });
    this.addPromoCards();
    CatalogPage.onProductClick(this.CONTAINER);
    return this.CONTAINER;
  }
}

export default HomePage;
