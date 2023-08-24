import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import QueryProducts from '../../backend/products/QueryProducts';

class CatalogPage extends Page {
  private CATALOG_PAGE_MARKUP = `
     <h1 class='page-title'>Search results:</h1>
     <div class='product-container'></div>`;

  constructor() {
    super(ProjectPages.Catalog);
  }

  private getProductList(): void {
    new QueryProducts()
      .queryProductList()
      .then((abc) => {
        const container = this.CONTAINER.querySelector('.product-container') as HTMLDivElement;

        abc.results.forEach((product) => {
          const productKey = product.key as string;
          const productName = product.masterData.current.name['en-US'];
          const productDescription = product.masterData.current.description?.['en-US'];
          const { url: imageURL, label: imageLabel } = product.masterData.current.masterVariant.images?.[0] ?? {
            url: '',
            label: '',
          };

          const productElement = document.createElement('div');
          productElement.className = `${product.id} product-item`;
          productElement.innerHTML = `
            <img class="${productKey} product-image" src="${imageURL}" alt="${imageLabel || ''}">
            <h2 class="${productKey} product-title">${productName}</h2>
            <p class="${productKey} product-description">${
              productDescription || ''
            }</p> <a class='order-me' href=#product/${productKey} target='_blank'>ADD TO CART</a>`;
          container.appendChild(productElement);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.CATALOG_PAGE_MARKUP;
    this.getProductList();
    return this.CONTAINER;
  }
}

export default CatalogPage;
