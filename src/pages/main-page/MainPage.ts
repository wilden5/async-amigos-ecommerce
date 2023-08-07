import Page from '../../components/templates/Page';

class MainPage extends Page {
  private MAIN_PAGE_MARKUP = `
     <h1 class='header'>Main Page</h1>`;

  constructor(className: string) {
    super(className);
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.MAIN_PAGE_MARKUP;
    return this.CONTAINER;
  }
}
export default MainPage;
