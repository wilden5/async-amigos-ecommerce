import Page from '../../components/templates/Page';

class LoginPage extends Page {
  private LOGIN_PAGE_MARKUP = `
     <h1 class='header'>Login Page</h1>`;

  constructor(className: string) {
    super(className);
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.LOGIN_PAGE_MARKUP;
    return this.CONTAINER;
  }
}

export default LoginPage;
