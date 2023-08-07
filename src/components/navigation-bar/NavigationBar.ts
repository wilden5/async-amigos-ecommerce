import Component from '../templates/Component';
import Constants from '../../utils/Constants';

class NavigationBar extends Component {
  private NAVIGATION_BAR_MARKUP = `
    <a href='/#'>Main</a>
    <a href='/#login-page'>Login page</a>
    <a href='/#registration-page'>Registration page</a>`;

  constructor() {
    super('nav', `${Constants.NAVIGATION_BAR_SELECTOR}`);
  }

  public renderComponent(): HTMLElement {
    this.CONTAINER.innerHTML = this.NAVIGATION_BAR_MARKUP;
    return this.CONTAINER;
  }
}

export default NavigationBar;
