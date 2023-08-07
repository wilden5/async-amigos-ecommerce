import Page from '../components/templates/Page';
import { ProjectPages } from '../types/Enums';
import MainPage from '../pages/main-page/MainPage';
import LoginPage from '../pages/login-page/LoginPage';
import RegistrationPage from '../pages/registration-page/RegistrationPage';
import ErrorPage from '../pages/error-page/ErrorPage';
import DOMHelpers from './DOMHelpers';

class Router {
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
      DOMHelpers.appendChildToElement(DOMHelpers.getElement('.page-wrapper'), currentPage.renderPage());
    }
  }

  private setupRouteChangeListener(initialSetup?: boolean): void {
    if (initialSetup) {
      this.renderSpecificPage(ProjectPages.MainPage);
    }
    window.addEventListener('hashchange', () => {
      const pageHash = window.location.hash.slice(1);
      this.renderSpecificPage(pageHash);
    });
  }

  public init(): void {
    this.setupRouteChangeListener(true);
  }
}

export default Router;
