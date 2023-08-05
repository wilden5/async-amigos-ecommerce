import NavigationBar from '../../components/navigation-bar/NavigationBar';
import MainPage from '../main-page/MainPage';
import Page from '../../components/templates/Page';
import LoginPage from '../login-page/LoginPage';
import RegistrationPage from '../registration-page/RegistrationPage';
import { ProjectPages } from '../../types/Enums';
import ErrorPage from '../error/ErrorPage';
import DOMHelpers from '../../utils/DOMHelpers';

class App {
  private PAGE_WRAPPER_CONTAINER: HTMLElement;

  private INITIAL_PAGE: MainPage;

  private NAVIGATION_BAR: NavigationBar;

  constructor() {
    this.NAVIGATION_BAR = new NavigationBar('nav', 'navigation-bar');
    this.INITIAL_PAGE = new MainPage('main-page');
    document.body.appendChild(this.NAVIGATION_BAR.renderComponent());
    this.PAGE_WRAPPER_CONTAINER = DOMHelpers.createElement('div', { className: 'page-wrapper' }, document.body);
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
      const page = document.querySelector('.page-wrapper');
      (page as HTMLElement).innerHTML = '';
      const pageHTML = currentPage.renderPage();
      this.PAGE_WRAPPER_CONTAINER.append(pageHTML);
    }
  }

  private setupRouteChangeListener(): void {
    window.addEventListener('hashchange', () => {
      const pageHash = window.location.hash.slice(1);
      this.renderSpecificPage(pageHash);
    });
  }

  public init(): void {
    this.setupRouteChangeListener();
    this.renderSpecificPage('main-page');
  }
}

export default App;
