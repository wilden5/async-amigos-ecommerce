import Component from '../templates/Component';
import Constants from '../../utils/Constants';

class NavigationBar extends Component {
  public NAVIGATION_BAR_MARKUP = `
    <ul class="${Constants.NAVIGATION_BAR_SELECTOR}__list">
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#'>Home</a></li>
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#catalog'>Catalog</a></li>
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#about-us'>About Us</a></li>
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#cart'>Cart</a></li>
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#my-profile'>My Profile</a></li>
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#login'>Login</a></li>
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#registration'>Registration</a></li>
    </ul>
  `;

  constructor() {
    super('nav', `${Constants.NAVIGATION_BAR_SELECTOR}`);
  }

  public renderComponent(): HTMLElement {
    this.CONTAINER.innerHTML = this.NAVIGATION_BAR_MARKUP;
    return this.CONTAINER;
  }
}

export default NavigationBar;
