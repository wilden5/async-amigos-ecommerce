import Page from '../../components/templates/Page';

class LoginPage extends Page {
  static TextVariables = {
    MainTitle: 'Login Page',
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(LoginPage.TextVariables.MainTitle);
    this.CONTAINER.append(title);
    return this.CONTAINER;
  }
}

export default LoginPage;
