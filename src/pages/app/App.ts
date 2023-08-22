import NavigationBar from '../../components/navigation-bar/NavigationBar';
import DOMHelpers from '../../utils/DOMHelpers';
import Router from '../../utils/Router';
import Constants from '../../utils/Constants';
import Header from '../../components/header/Header';

class App {
  private ROUTER: Router;

  private HEADER: Header;

  private NAVIGATION_BAR: NavigationBar;

  private readonly PAGE_CONTAINER: HTMLElement = DOMHelpers.createElement('div', {
    className: `${Constants.PAGE_CONTAINER_SELECTOR}`,
  });

  constructor() {
    this.ROUTER = new Router();
    this.HEADER = new Header();
    this.NAVIGATION_BAR = NavigationBar.getInstance();
    DOMHelpers.appendChildToElement(document.body, this.HEADER.renderComponent()); // append header container
    DOMHelpers.appendChildToElement(
      DOMHelpers.getElement(`${Constants.HEADER_CONTAINER_SELECTOR}`),
      this.NAVIGATION_BAR.renderComponent(),
    );
    DOMHelpers.appendChildToElement(document.body, this.PAGE_CONTAINER); // append generic page container
  }

  public init(): void {
    this.ROUTER.init();
  }
}

export default App;
