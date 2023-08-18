/* eslint-disable no-console */
import Component from '../templates/Component';
import Constants from '../../utils/Constants';

class NavigationBar extends Component {
  private NAVIGATION_BAR_MARKUP = `
    <a class='home' href='#'>Home</a>
    <a class='login' href='#login'>Login</a>
    <a clsass='registration' href='#registration'>Registration</a>
    <a class='catalog' href='#catalog'>Catalog</a>
    <a class='profile' href='#my-profile'>My Profile</a>
    <a class='cart' href='#cart'>Cart</a>
    <a class='about' href='#about-us'>About Us</a>`;

  constructor() {
    super('nav', `${Constants.NAVIGATION_BAR_SELECTOR}`);
  }

  public renderComponent(): HTMLElement {
    this.CONTAINER.innerHTML = this.NAVIGATION_BAR_MARKUP;
    return this.CONTAINER;
  }
}

export default NavigationBar;
