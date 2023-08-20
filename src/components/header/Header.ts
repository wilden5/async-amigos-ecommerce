import Component from '../templates/Component';
import headerLogo from '../../assets/header-logo2.png';
import Constants from '../../utils/Constants';
import DOMHelpers from '../../utils/DOMHelpers';

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

  private handleBurgerIconClick(): void {
    const burgerBtn = this.CONTAINER.querySelector('.header-container__burger') as HTMLButtonElement;

    if (!burgerBtn) return;
    burgerBtn.addEventListener('click', (): void => {
      DOMHelpers.showHeaderMenu(this.CONTAINER);
    });
  }

  public renderComponent(): HTMLElement {
    this.CONTAINER.innerHTML = this.HEADER_MARKUP;
    this.handleBurgerIconClick();
    return this.CONTAINER;
  }
}

export default Header;
