import Page from '../components/templates/Page';
import { ProjectPages } from '../types/Enums';
import MainPage from '../pages/main-page/MainPage';
import LoginPage from '../pages/login-page/LoginPage';
import RegistrationPage from '../pages/registration-page/RegistrationPage';
import ErrorPage from '../pages/error-page/ErrorPage';
import DOMHelpers from './DOMHelpers';
import Constants from './Constants';

class Router {
  private renderSpecificPage(pageID: string): void {
    let currentPage: Page;
    DOMHelpers.getElement(`${Constants.PAGE_CONTAINER_SELECTOR}`).innerHTML = ''; // remove content before next page loading

    switch (pageID) {
      case ProjectPages.MainPage:
      case ProjectPages.MainPageDummy:
        currentPage = new MainPage();
        break;
      case ProjectPages.LoginPage:
        currentPage = new LoginPage();
        break;
      case ProjectPages.RegistrationPage:
        currentPage = new RegistrationPage();
        break;
      default:
        currentPage = new ErrorPage();
        break;
    }

    DOMHelpers.appendChildToElement(
      DOMHelpers.getElement(`${Constants.PAGE_CONTAINER_SELECTOR}`),
      currentPage.renderPage(),
    );
  }

  private handleHashChange(): void {
    const pageHash = window.location.hash.slice(1);
    this.renderSpecificPage(pageHash);
  }

  private setupRouteChangeListener(initialPage?: ProjectPages): void {
    if (initialPage) {
      this.renderSpecificPage(initialPage);
    }
    window.addEventListener('hashchange', () => {
      this.handleHashChange();
    });
    window.addEventListener('load', () => {
      this.handleHashChange();
    });
  }

  public init(): void {
    this.setupRouteChangeListener(ProjectPages.MainPage);
  }
}

export default Router;
