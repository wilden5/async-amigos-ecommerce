import { ProductProjection, ProductType, ProductTypePagedQueryResponse } from '@commercetools/platform-sdk';
import { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import QueryProducts from '../../backend/products/QueryProducts';
import PromiseHelpers from '../../utils/PromiseHelpers';
import Constants from '../../utils/Constants';
import ProductProjectionSearch from '../../backend/products/ProductProjectionSearch';
import ProductCardBuilder from './ProductCardBuilder';

class CatalogPageFilters {
  static populateProductTypesSelect(container: HTMLElement): void {
    const typeSelect = container.querySelector('.type-select') as HTMLSelectElement;
    new QueryProducts()
      .queryProductTypes()
      .then((queriedProductTypes: ProductTypePagedQueryResponse) => {
        queriedProductTypes.results.forEach((type: ProductType) => {
          const productTypeOption = document.createElement('option');
          productTypeOption.value = type.id;
          productTypeOption.textContent = type.name;
          typeSelect.appendChild(productTypeOption);
        });
      })
      .catch((error: Error): void => {
        PromiseHelpers.catchBlockHelper(error, Constants.FETCH_PRODUCT_TYPES_ERROR);
      });
  }

  static performFilterByProductType(container: HTMLElement): void {
    (container.querySelector('.type-select') as HTMLSelectElement).addEventListener('change', () => {
      const selectedValue = (container.querySelector('.type-select') as HTMLSelectElement).value;
      new ProductProjectionSearch()
        .filterProductCatalog(`productType.id:"${selectedValue}"`)
        .then((queriedProductList: ProductProjectionPagedSearchResponse): void => {
          const productContainer = container.querySelector('.product-container') as HTMLElement;
          productContainer.innerHTML = '';
          queriedProductList.results.forEach((product: ProductProjection): void => {
            ProductCardBuilder.buildProductCard(product, productContainer);
          });
        })
        .catch((error: Error): void => {
          PromiseHelpers.catchBlockHelper(error, Constants.FETCH_CATALOG_ERROR);
        });
    });
  }

  static initAllFilters(container: HTMLElement): void {
    CatalogPageFilters.populateProductTypesSelect(container);
    CatalogPageFilters.performFilterByProductType(container);
  }
}

export default CatalogPageFilters;
