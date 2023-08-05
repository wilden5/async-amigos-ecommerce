import NavigationBar from '../../components/navigation-bar/NavigationBar';
import MainPage from '../main-page/MainPage';
import Page from '../../components/templates/Page';
import LoginPage from '../login-page/LoginPage';
import RegistrationPage from '../registration-page/RegistrationPage';
import { ProjectPages } from '../../types/Enums';
import ErrorPage from '../error/ErrorPage';
import DOMHelpers from '../../utils/DOMHelpers';

class App {
  private readonly PAGE_WRAPPER_CONTAINER: HTMLElement;

  private INITIAL_PAGE: MainPage;

  private NAVIGATION_BAR: NavigationBar;

  constructor() {
    this.PAGE_WRAPPER_CONTAINER = DOMHelpers.createElement('div', { className: 'page-wrapper' });
    this.NAVIGATION_BAR = new NavigationBar('nav', 'navigation-bar');
    this.INITIAL_PAGE = new MainPage('main-page');
  }

  private renderSpecificPage(pageID: string): void {
    let currentPage: Page;

    switch (pageID) {
      case ProjectPages.MainPage:
        currentPage = new MainPage(pageID);
        break;
      case ProjectPages.LoginPage:
        currentPage = new LoginPage(pageID);
        break;
      case ProjectPages.RegistrationPage:
        currentPage = new RegistrationPage(pageID);
        break;
      default:
        currentPage = new ErrorPage(ProjectPages.ErrorPage);
        break;
    }

    if (currentPage) {
      DOMHelpers.getElement('.page-wrapper').innerHTML = '';
      DOMHelpers.appendChildToElement(this.PAGE_WRAPPER_CONTAINER, currentPage.renderPage());
    }
  }

  private setupRouteChangeListener(): void {
    window.addEventListener('hashchange', () => {
      const pageHash = window.location.hash.slice(1);
      this.renderSpecificPage(pageHash);
    });
  }

  public init(): void {
    DOMHelpers.appendChildToElement(document.body, this.NAVIGATION_BAR.renderComponent());
    DOMHelpers.appendChildToElement(document.body, this.PAGE_WRAPPER_CONTAINER);
    this.setupRouteChangeListener();
    this.renderSpecificPage('main-page');
  }
}

export default App;
