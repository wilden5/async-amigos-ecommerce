import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';

class CatalogPage extends Page {
  private CATALOG_PAGE_MARKUP = `
     <h1 class='header'>Catalog Page</h1>`;

  constructor() {
    super(ProjectPages.Catalog);
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.CATALOG_PAGE_MARKUP;
    return this.CONTAINER;
  }
}

export default CatalogPage;
