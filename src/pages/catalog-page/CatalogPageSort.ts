import {
  ProductProjectionPagedQueryResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { ProductProjection } from '@commercetools/platform-sdk';
import ProductProjectionSearch from '../../backend/products/ProductProjectionSearch';
import ProductCardBuilder from './ProductCardBuilder';
import PromiseHelpers from '../../utils/PromiseHelpers';
import Constants from '../../utils/Constants';
import ToastifyHelper from '../../utils/TostifyHelper';
import DOMHelpers from '../../utils/DOMHelpers';

class CatalogPageSort {
  static applySortByCondition(container: HTMLElement): void {
    const sortSelect = container.querySelector('.sort-by') as HTMLSelectElement;

    sortSelect.addEventListener('change', () => {
      const productContainer = container.querySelector('.product-container') as HTMLElement;
      productContainer.innerHTML = '';
      if (sortSelect.value.includes('name')) {
        new ProductProjectionSearch()
          .queryProductCatalog(sortSelect.value)
          .then((queriedProductList: ProductProjectionPagedQueryResponse) => {
            queriedProductList.results.forEach((product: ProductProjection) => {
              ProductCardBuilder.buildProductCard(product, productContainer);
            });
            DOMHelpers.clearPaginationContainer();
          })
          .catch((error: Error): void => {
            PromiseHelpers.catchBlockHelper(error, Constants.FETCH_CATALOG_ERROR);
          });
      }

      if (sortSelect.value.includes('price')) {
        new ProductProjectionSearch()
          .searchProductCatalog(undefined, sortSelect.value)
          .then((queriedProductList: ProductProjectionPagedSearchResponse) => {
            queriedProductList.results.forEach((product: ProductProjection) => {
              ProductCardBuilder.buildProductCard(product, productContainer);
            });
            DOMHelpers.clearPaginationContainer();
          })
          .catch((error: Error): void => {
            PromiseHelpers.catchBlockHelper(error, Constants.FETCH_CATALOG_ERROR);
          });
      }
      ToastifyHelper.showToast(
        `Sort was applied by ${sortSelect.selectedOptions[0].text}`,
        Constants.TOAST_COLOR_DARK_GREEN,
      );
    });
  }

  static initSort(container: HTMLElement): void {
    CatalogPageSort.applySortByCondition(container);
  }
}

export default CatalogPageSort;
