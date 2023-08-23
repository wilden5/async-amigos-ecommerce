import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import QueryProducts from '../../backend/products/QueryProducts';

class CatalogPage extends Page {
  private CATALOG_PAGE_MARKUP = `
     <h1 class='page-title'>Catalog Page</h1>
     <div class='list-container'></div>`;

  constructor() {
    super(ProjectPages.Catalog);
  }

  private getProductList(): void {
    new QueryProducts()
      .queryProductList()
      .then((abc) => {
        const container = this.CONTAINER.querySelector('.list-container') as HTMLDivElement;

        container.innerHTML = JSON.stringify(abc);
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
