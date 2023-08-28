import { ProductType, ProductTypePagedQueryResponse } from '@commercetools/platform-sdk';
import QueryProducts from '../../backend/products/QueryProducts';
import PromiseHelpers from '../../utils/PromiseHelpers';
import Constants from '../../utils/Constants';

class CatalogPageFilters {
  static populateProductTypesSelect(container: HTMLElement): void {
    const typeSelect = container.querySelector('.type-select') as HTMLSelectElement;
    new QueryProducts()
      .queryProductTypes()
      .then((queriedProductTypes: ProductTypePagedQueryResponse) => {
        queriedProductTypes.results.forEach((type: ProductType) => {
          const productTypeOption = document.createElement('option');
          productTypeOption.value = type.key as string;
          productTypeOption.textContent = type.name;
          typeSelect.appendChild(productTypeOption);
        });
      })
      .catch((error: Error): void => {
        PromiseHelpers.catchBlockHelper(error, Constants.FETCH_PRODUCT_TYPES_ERROR);
      });
  }

  static initAllFilters(container: HTMLElement): void {
    CatalogPageFilters.populateProductTypesSelect(container);
  }
}

export default CatalogPageFilters;
