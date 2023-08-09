import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';

class CatalogPage extends Page {
  private LOGIN_PAGE_MARKUP = `
     <h1 class='header'>Catalog Page</h1>`;

  constructor() {
    super(ProjectPages.CatalogPage);
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.LOGIN_PAGE_MARKUP;
    return this.CONTAINER;
  }
}

export default CatalogPage;
