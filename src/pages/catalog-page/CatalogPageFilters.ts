import { ProductProjection, ProductType, ProductTypePagedQueryResponse } from '@commercetools/platform-sdk';
import { ProductProjectionPagedSearchResponse } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/product';
import QueryProducts from '../../backend/products/QueryProducts';
import PromiseHelpers from '../../utils/PromiseHelpers';
import Constants from '../../utils/Constants';
import ProductProjectionSearch from '../../backend/products/ProductProjectionSearch';
import ProductCardBuilder from './ProductCardBuilder';
import TostifyHelper from '../../utils/TostifyHelper';

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
        .searchProductCatalog(`productType.id:"${selectedValue}"`)
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
          .searchProductCatalog()
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

  static populateProductAttributeSelect(container: HTMLElement, attributeNumber: number, selectSelector: string): void {
    const yearAttributes = new Set();
    new ProductProjectionSearch()
      .searchProductCatalog()
      .then((queriedProductList: ProductProjectionPagedSearchResponse) => {
        queriedProductList.results.forEach((product: ProductProjection) => {
          if (product.masterVariant.attributes) {
            yearAttributes.add(product.masterVariant.attributes[attributeNumber].value);
          }
        });
      })
      .then(() => {
        const yearSelect = container.querySelector(`.${selectSelector}`) as HTMLSelectElement;
        Array.from(yearAttributes)
          .sort()
          .reverse()
          .forEach((item) => {
            const productYearOption = document.createElement('option');
            productYearOption.value = String(item as string).toLowerCase();
            productYearOption.textContent = String(item as string).toLowerCase();
            yearSelect.appendChild(productYearOption);
          });
      })
      .catch((error: Error): void => {
        PromiseHelpers.catchBlockHelper(error, Constants.FETCH_CATALOG_ERROR);
      });
  }

  static performFilterBySpecificProductAttribute(
    container: HTMLElement,
    attributeNumber: number,
    selectSelector: string,
  ): void {
    let queriedProducts: ProductProjection[] = [];
    (container.querySelector(`.${selectSelector}`) as HTMLSelectElement).addEventListener('change', () => {
      queriedProducts = [];
      const productContainer = container.querySelector('.product-container') as HTMLElement;
      productContainer.innerHTML = '';
      const selectedValue = (container.querySelector(`.${selectSelector}`) as HTMLSelectElement).value;
      new ProductProjectionSearch()
        .searchProductCatalog()
        .then((queriedProductList: ProductProjectionPagedSearchResponse) => {
          queriedProductList.results.forEach((product: ProductProjection) => {
            if (product.masterVariant.attributes) {
              if (selectSelector === Constants.LAUNCH_DATE_CLASSNAME) {
                if (product.masterVariant.attributes[attributeNumber].value === Number(selectedValue))
                  queriedProducts.push(product);
              }
              if (selectSelector === Constants.BRAND_CLASSNAME) {
                if (
                  (product.masterVariant.attributes[attributeNumber].value as string).toLowerCase() === selectedValue
                ) {
                  queriedProducts.push(product);
                }
              }
            }
          });
        })
        .then(() => {
          queriedProducts.forEach((product) => {
            ProductCardBuilder.buildProductCard(product, productContainer);
          });
        })
        .catch((error: Error): void => {
          PromiseHelpers.catchBlockHelper(error, Constants.FETCH_CATALOG_ERROR);
        });
    });
  }

  static performProductByPriceRange(container: HTMLElement): void {
    const priceMin = container.querySelector('.price-min') as HTMLInputElement;
    const priceMax = container.querySelector('.price-max') as HTMLInputElement;
    const prices = container.querySelectorAll('.price-inp');
    let finalQuery: string;

    prices.forEach((item) => {
      item.addEventListener('input', () => {
        const productContainer = container.querySelector('.product-container') as HTMLElement;
        productContainer.innerHTML = '';
        const priceMinValue = Number(priceMin.value) > 0 ? Number(priceMin.value) * 100 : 0;
        const priceMaxValue = Number(priceMax.value) * 100;

        if (priceMinValue && priceMaxValue) {
          finalQuery = `variants.price.centAmount:range (${priceMinValue} to ${priceMaxValue})`;
        }

        if (priceMinValue && !priceMaxValue) {
          finalQuery = `variants.price.centAmount:range (${priceMinValue} to *)`;
        }

        if (!priceMinValue && priceMaxValue) {
          finalQuery = `variants.price.centAmount:range (* to ${priceMaxValue})`;
        }

        if (priceMaxValue < 0 || priceMinValue < 0) {
          TostifyHelper.showToast(Constants.PRICE_INVALID_INPUT_ERROR_MESSAGE, Constants.TOAST_COLOR_RED);
        }

        new ProductProjectionSearch()
          .searchProductCatalog(finalQuery)
          .then((queriedProductList: ProductProjectionPagedSearchResponse) => {
            queriedProductList.results.forEach((product: ProductProjection) => {
              ProductCardBuilder.buildProductCard(product, productContainer);
            });
          })
          .catch((error: Error): void => {
            PromiseHelpers.catchBlockHelper(error, Constants.FETCH_CATALOG_ERROR);
          });
      });
    });
  }

  static performFullTextSearch(container: HTMLElement): void {
    const searchInput = container.querySelector('.search-field') as HTMLInputElement;

    searchInput.addEventListener('input', () => {
      const productContainer = container.querySelector('.product-container') as HTMLElement;
      productContainer.innerHTML = '';
      new ProductProjectionSearch()
        .searchProductCatalog(undefined, undefined, searchInput.value.replace(/\s+/g, ''))
        .then((queriedProductList: ProductProjectionPagedSearchResponse) => {
          queriedProductList.results.forEach((product: ProductProjection) => {
            ProductCardBuilder.buildProductCard(product, productContainer);
          });
        })
        .catch((error: Error): void => {
          PromiseHelpers.catchBlockHelper(error, Constants.FETCH_CATALOG_ERROR);
        });
    });
  }

  static initAllFilters(container: HTMLElement, callback: () => void): void {
    CatalogPageFilters.populateProductTypesSelect(container);
    CatalogPageFilters.populateProductAttributeSelect(container, 3, Constants.LAUNCH_DATE_CLASSNAME);
    CatalogPageFilters.populateProductAttributeSelect(container, 0, Constants.BRAND_CLASSNAME);
    CatalogPageFilters.performFilterByProductType(container);
    CatalogPageFilters.performFilterByOnSale(container, callback);
    CatalogPageFilters.performFilterBySpecificProductAttribute(container, 3, Constants.LAUNCH_DATE_CLASSNAME);
    CatalogPageFilters.performFilterBySpecificProductAttribute(container, 0, Constants.BRAND_CLASSNAME);
    CatalogPageFilters.performProductByPriceRange(container);
    CatalogPageFilters.performFullTextSearch(container);
  }
}

export default CatalogPageFilters;
