import NavigationBar from '../../components/navigation-bar/NavigationBar';
import MainPage from '../main-page/MainPage';
import Page from '../../components/templates/Page';
import LoginPage from '../login-page/LoginPage';
import RegistrationPage from '../registration-page/RegistrationPage';
import { Errors, ProjectPages } from '../../types/Enums';
import ErrorPage from '../error/ErrorPage';

class App {
  private NAVIGATION_BAR: NavigationBar;

  private INITIAL_PAGE: MainPage;

  private static CONTAINER: HTMLElement = document.body;

  private static defaultPageId = 'current-page';

  static renderNewPage(idPage: string): void {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }
    let page: Page | null = null;

    if (idPage === ProjectPages.MainPage) {
      page = new MainPage(idPage);
    } else if (idPage === ProjectPages.LoginPage) {
      page = new LoginPage(idPage);
    } else if (idPage === ProjectPages.RegistrationPage) {
      page = new RegistrationPage(idPage);
    } else {
      page = new ErrorPage(idPage, Errors.Error_404);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.CONTAINER.append(pageHTML);
    }
  }

  private enableRouteChange(): void {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    this.INITIAL_PAGE = new MainPage('main-page');
    this.NAVIGATION_BAR = new NavigationBar('nav', 'navigation-bar');
  }

  public init(): void {
    App.CONTAINER.append(this.NAVIGATION_BAR.render());
    App.renderNewPage('main-page');
    this.enableRouteChange();
  }
}

export default App;
