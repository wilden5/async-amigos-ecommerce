import Component from '../templates/Component';
import Constants from '../../utils/Constants';

class NavigationBar extends Component {
  private NAVIGATION_BAR_MARKUP = `
    <a href='/#'>Home</a>
    <a href='/#login'>Login</a>
    <a href='/#registration'>Registration</a>
    <a href='/#catalog'>Catalog</a>
    <a href='/#my-profile'>My Profile</a>`;

  constructor() {
    super('nav', `${Constants.NAVIGATION_BAR_SELECTOR}`);
  }

  public renderComponent(): HTMLElement {
    this.CONTAINER.innerHTML = this.NAVIGATION_BAR_MARKUP;
    return this.CONTAINER;
  }
}

export default NavigationBar;
