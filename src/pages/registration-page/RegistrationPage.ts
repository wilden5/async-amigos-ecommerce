import Page from '../../components/templates/Page';

class RegistrationPage extends Page {
  private REGISTRATION_PAGE_MARKUP = `
     <h1 class='header'>Registration Page</h1>`;

  constructor(id: string) {
    super(id);
  }

  renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.REGISTRATION_PAGE_MARKUP;
    return this.CONTAINER;
  }
}

export default RegistrationPage;
