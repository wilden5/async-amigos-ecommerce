import Component from '../templates/Component';
import headerLogo from '../../assets/header-logo2.png';
import Constants from '../../utils/Constants';

class Header extends Component {
  private HEADER_MARKUP = `<a class='home-page-link' href='#'><img class='e-header-logo' src='${headerLogo}' alt='header-logo'></a>`;

  constructor() {
    super('div', `${Constants.HEADER_CONTAINER_SELECTOR}`);
  }

  public renderComponent(): HTMLElement {
    this.CONTAINER.innerHTML = this.HEADER_MARKUP;
    return this.CONTAINER;
  }
}

export default Header;
