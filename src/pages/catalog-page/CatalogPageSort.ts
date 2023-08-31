import { ProductProjectionPagedQueryResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import { ProductProjection } from '@commercetools/platform-sdk';
import ProductProjectionSearch from '../../backend/products/ProductProjectionSearch';
import ProductCardBuilder from './ProductCardBuilder';
import PromiseHelpers from '../../utils/PromiseHelpers';
import Constants from '../../utils/Constants';

class CatalogPageSort {
  static applySortByCondition(container: HTMLElement): void {
    const sortSelect = container.querySelector('.sort-by') as HTMLSelectElement;

    sortSelect.addEventListener('change', () => {
      console.log(sortSelect.value);
      const productContainer = container.querySelector('.product-container') as HTMLElement;
      productContainer.innerHTML = '';
      new ProductProjectionSearch()
        .sortProductCatalog(sortSelect.value)
        .then((queriedProductList: ProductProjectionPagedQueryResponse) => {
          queriedProductList.results.forEach((product: ProductProjection) => {
            ProductCardBuilder.buildProductCard(product, productContainer);
          });
        })
        .catch((error: Error): void => {
          PromiseHelpers.catchBlockHelper(error, Constants.FETCH_CATALOG_ERROR);
        });
    });
  }

  static initSort(container: HTMLElement): void {
    CatalogPageSort.applySortByCondition(container);
  }
}

export default CatalogPageSort;
