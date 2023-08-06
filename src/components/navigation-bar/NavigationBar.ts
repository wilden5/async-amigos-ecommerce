import Component from '../templates/Component';

class NavigationBar extends Component {
  private NAVIGATION_BAR_MARKUP = `
    <a href='/#main-page'>Main</a>
    <a href='/#login-page'>Login page</a>
    <a href='/#registration-page'>Registration page</a>`;

  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  public renderComponent(): HTMLElement {
    this.CONTAINER.innerHTML = this.NAVIGATION_BAR_MARKUP;
    return this.CONTAINER;
  }
}

export default NavigationBar;
