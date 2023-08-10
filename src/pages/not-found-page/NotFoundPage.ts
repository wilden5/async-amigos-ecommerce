import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import notFoundImage from '../../assets/not-found-image.png';

class NotFoundPage extends Page {
  private NOT_FOUND_PAGE_MARKUP = `
  <h2 class="error-header" data-text="404">404</h2>
    <img src="${notFoundImage}" alt="grumpy-cat">
    <p class="error-message">Oops! The page you're looking for doesn't exist.</p>
    <a class="navigate-to-home" href="#">Return to homepage</a>`;

  constructor() {
    super(ProjectPages.NotFound);
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.NOT_FOUND_PAGE_MARKUP;
    return this.CONTAINER;
  }
}
export default NotFoundPage;
