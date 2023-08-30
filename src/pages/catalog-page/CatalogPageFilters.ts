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

  static performFilterByOnSale(container: HTMLElement, callback: () => void): void {
    const onSaleCheckbox = container.querySelector('.on-sale-checkbox') as HTMLInputElement;
    onSaleCheckbox.addEventListener('change', () => {
      const productContainer = container.querySelector('.product-container') as HTMLElement;
      productContainer.innerHTML = '';
      if (onSaleCheckbox.checked) {
        const discountedProducts: ProductProjection[] = [];
        new ProductProjectionSearch()
          .filterProductCatalog()
          .then((queriedProductList: ProductProjectionPagedSearchResponse) => {
            queriedProductList.results.forEach((product: ProductProjection) => {
              if (product.masterVariant.prices && product.masterVariant.prices[0].discounted) {
                discountedProducts.push(product);
              }
            });
          })
          .then(() =>
            discountedProducts.forEach((product: ProductProjection) => {
              ProductCardBuilder.buildProductCard(product, productContainer);
            }),
          )
          .catch((error: Error): void => {
            PromiseHelpers.catchBlockHelper(error, Constants.FETCH_CATALOG_ERROR);
          });
      } else {
        callback();
      }
    });
  }

  static initAllFilters(container: HTMLElement, callback: () => void): void {
    CatalogPageFilters.populateProductTypesSelect(container);
    CatalogPageFilters.performFilterByProductType(container);
    CatalogPageFilters.performFilterByOnSale(container, callback);
  }
}

export default CatalogPageFilters;
