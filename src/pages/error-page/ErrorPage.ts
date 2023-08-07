import Page from '../../components/templates/Page';

class ErrorPage extends Page {
  private ERROR_PAGE_MARKUP = `
     <h1 class='header'>404 Page was not found</h1>`;

  constructor(className: string) {
    super(className);
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.ERROR_PAGE_MARKUP;
    return this.CONTAINER;
  }
}
export default ErrorPage;
