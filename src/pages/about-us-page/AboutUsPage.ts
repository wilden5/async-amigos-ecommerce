import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';

class AboutUsPage extends Page {
  private ABOUT_US_PAGE_MARKUP = `
    <div class="about-us__container">
      <h1 class='page-title'>About Us Page</h1>
    </div>`;

  constructor() {
    super(ProjectPages.AboutUs);
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.ABOUT_US_PAGE_MARKUP;
    return this.CONTAINER;
  }
}

export default AboutUsPage;
