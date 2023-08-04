import Page from '../../components/templates/Page';

class RegistrationPage extends Page {
  static TextVariables = {
    MainTitle: 'Registration Page',
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(RegistrationPage.TextVariables.MainTitle);
    this.CONTAINER.append(title);
    return this.CONTAINER;
  }
}

export default RegistrationPage;
