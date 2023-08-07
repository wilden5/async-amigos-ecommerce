import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';

class LoginPage extends Page {
  private LOGIN_PAGE_MARKUP = `
     <h1 class='header'>Login Page</h1>`;

  constructor() {
    super(ProjectPages.LoginPage);
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.LOGIN_PAGE_MARKUP;
    return this.CONTAINER;
  }
}

export default LoginPage;
