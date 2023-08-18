import NavigationBar from '../../components/navigation-bar/NavigationBar';
import DOMHelpers from '../../utils/DOMHelpers';
import Router from '../../utils/Router';
import Constants from '../../utils/Constants';
import Header from '../../components/header/Header';
import { apiRoot } from '../../backend/ctpClient/apiRoot';

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
    this.NAVIGATION_BAR = new NavigationBar();
    DOMHelpers.appendChildToElement(document.body, this.HEADER.renderComponent()); // append header container
    DOMHelpers.appendChildToElement(
      DOMHelpers.getElement(`${Constants.HEADER_CONTAINER_SELECTOR}`),
      this.NAVIGATION_BAR.renderComponent(),
    );
    DOMHelpers.appendChildToElement(document.body, this.PAGE_CONTAINER); // append generic page container
  }

  // Этот код чисто для проверки работы токена
  private getCatalog = (): void => {
    apiRoot.request
      .productProjections()
      .get()
      .execute()
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
      })
      .catch(Error);
  };

  getMyProfile = (): void => {
    apiRoot.request
      .customers()
      .get()
      .execute()
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
      })
      .catch(Error);
  };

  getCart = (): void => {
    apiRoot.request
      .carts()
      .get()
      .execute()
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
      })
      .catch(Error);
  };

  private assignEventListeners(): void {
    const catalog = document.querySelector('.catalog');
    catalog?.addEventListener('click', this.getCatalog);

    const profile = document.querySelector('.profile');
    profile?.addEventListener('click', this.getMyProfile);

    const cart = document.querySelector('.cart');
    cart?.addEventListener('click', this.getMyProfile);
  }

  public init(): void {
    this.ROUTER.init();
    this.assignEventListeners();
  }
}

export default App;
