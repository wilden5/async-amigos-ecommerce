import Page from '../../components/templates/Page';
import Constants from '../../utils/Constants';

class HomePage extends Page {
  private HOME_PAGE_MARKUP = `
     <h1 class='header'>Home Page</h1>`;

  constructor() {
    super(Constants.HOME_PAGE_SELECTOR);
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.HOME_PAGE_MARKUP;
    return this.CONTAINER;
  }
}
export default HomePage;
