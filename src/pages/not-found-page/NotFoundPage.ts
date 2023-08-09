import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';

class NotFoundPage extends Page {
  private NOT_FOUND_PAGE_MARKUP = `
     <h1 class='header'>404 Page was not found</h1>`;

  constructor() {
    super(ProjectPages.NotFound);
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.NOT_FOUND_PAGE_MARKUP;
    return this.CONTAINER;
  }
}
export default NotFoundPage;
