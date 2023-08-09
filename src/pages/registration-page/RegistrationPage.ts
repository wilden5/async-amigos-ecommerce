import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';

class RegistrationPage extends Page {
  private REGISTRATION_PAGE_MARKUP = `
     <h1 class='header'>Registration Page</h1>`;

  constructor() {
    super(ProjectPages.Registration);
  }

  renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.REGISTRATION_PAGE_MARKUP;
    return this.CONTAINER;
  }
}

export default RegistrationPage;
