import Component from '../templates/Component';
import { ProjectPages } from '../../types/Enums';

const Buttons = [
  {
    id: ProjectPages.MainPage,
    text: 'Main Page',
  },
  {
    id: ProjectPages.LoginPage,
    text: 'Login Page',
  },
  {
    id: ProjectPages.RegistrationPage,
    text: 'Registration Page',
  },
];

class NavigationBar extends Component {
  private markup = `<div class='navigation-bar'>
    <a href='/'>Main</a>
    <a href='/login-page'>Login page</a>
    <a href='/registration-page'>Registration page</a>
  </div>`;

  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  public renderPageButtons(): void {
    const pageButtons = document.createElement('div');
    pageButtons.classList.add('pages-wrapper');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      pageButtons.append(buttonHTML);
    });
    this.CONTAINER.append(pageButtons);
  }

  public render(): HTMLElement {
    this.renderPageButtons();
    return this.CONTAINER;
  }
}

export default NavigationBar;
