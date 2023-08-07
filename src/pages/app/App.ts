import NavigationBar from '../../components/navigation-bar/NavigationBar';
import DOMHelpers from '../../utils/DOMHelpers';
import Router from '../../utils/Router';

class App {
  private ROUTER: Router;

  private readonly PAGE_WRAPPER_CONTAINER: HTMLElement;

  private NAVIGATION_BAR: NavigationBar;

  constructor() {
    this.ROUTER = new Router();
    this.PAGE_WRAPPER_CONTAINER = DOMHelpers.createElement('div', { className: 'page-wrapper' });
    this.NAVIGATION_BAR = new NavigationBar('nav', 'navigation-bar');
  }

  public init(): void {
    DOMHelpers.appendChildToElement(document.body, this.NAVIGATION_BAR.renderComponent());
    DOMHelpers.appendChildToElement(document.body, this.PAGE_WRAPPER_CONTAINER);
    this.ROUTER.init();
  }
}

export default App;
