import NavigationBar from '../../components/navigation-bar/NavigationBar';
import DOMHelpers from '../../utils/DOMHelpers';
import Router from '../../utils/Router';
import Constants from '../../utils/Constants';

class App {
  private ROUTER: Router;

  private NAVIGATION_BAR: NavigationBar;

  private readonly PAGE_CONTAINER: HTMLElement = DOMHelpers.createElement('div', {
    className: `${Constants.PAGE_CONTAINER_SELECTOR}`,
  });

  constructor() {
    this.ROUTER = new Router();
    this.NAVIGATION_BAR = new NavigationBar();
    DOMHelpers.appendChildToElement(document.body, this.NAVIGATION_BAR.renderComponent()); // append nav bar
    DOMHelpers.appendChildToElement(document.body, this.PAGE_CONTAINER); // append generic page container
  }

  public init(): void {
    this.ROUTER.init();
  }
}

export default App;
