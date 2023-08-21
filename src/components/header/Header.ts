import Component from '../templates/Component';
import headerLogo from '../../assets/header-logo2.png';
import Constants from '../../utils/Constants';

// import DOMHelpers from '../../utils/DOMHelpers';

class Header extends Component {
  private HEADER_MARKUP = `
    <div class="${Constants.HEADER_CONTAINER_SELECTOR}">
      <a class='home-page-link' href='#'>
        <img class='${Constants.HEADER_CONTAINER_SELECTOR}__logo' src='${headerLogo}' alt='header-logo'>
      </a>
      <button class='${Constants.HEADER_CONTAINER_SELECTOR}__burger'>
        <span></span>
        <span></span>
      </button>
    </div>
  `;

  constructor() {
    super('header', `${Constants.HEADER}`);
  }

  private showHeaderMenu(): void {
    this.CONTAINER.addEventListener('click', (event: MouseEvent): void => {
      const targetElement = event.target as HTMLElement;
      const burgerBtn = this.CONTAINER.querySelector('.header-container__burger') as HTMLButtonElement;
      const burgerMenu = this.CONTAINER.querySelector('.navigation-bar') as HTMLElement;
      if (
        targetElement.closest('.navigation-bar__item') ||
        targetElement.closest('.navigation-bar.active') ||
        targetElement.closest('.header-container__burger')
      ) {
        if (burgerBtn && burgerMenu) {
          burgerBtn.classList.toggle('active');
          burgerMenu.classList.toggle('active');
        }
      }
    });
  }

  public renderComponent(): HTMLElement {
    this.CONTAINER.innerHTML = this.HEADER_MARKUP;
    this.showHeaderMenu();
    return this.CONTAINER;
  }
}

export default Header;
