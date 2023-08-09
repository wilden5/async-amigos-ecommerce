import Page from '../../components/templates/Page';
import Constants from '../../utils/Constants';

class MainPage extends Page {
  private MAIN_PAGE_MARKUP = `
     <h1 class='header'>Main Page</h1>`;

  constructor() {
    super(Constants.MAIN_PAGE_SELECTOR);
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.MAIN_PAGE_MARKUP;
    return this.CONTAINER;
  }
}
export default MainPage;
