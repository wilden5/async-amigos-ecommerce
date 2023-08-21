import Component from '../templates/Component';
import Constants from '../../utils/Constants';
import LocalStorage from '../../utils/LocalStorage';
import { ProjectPages } from '../../types/Enums';

class NavigationBar extends Component {
  private LOCAL_STORAGE: LocalStorage;

  public NAVIGATION_BAR_MARKUP_GUEST = `
    <ul class="${Constants.NAVIGATION_BAR_SELECTOR}__list">
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#'>Home</a></li>
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#catalog'>Catalog</a></li>
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#about-us'>About Us</a></li>
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#cart'>Cart</a></li>
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#login'>Login</a></li>
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#registration'>Registration</a></li>
    </ul>
  `;

  public NAVIGATION_BAR_MARKUP_AUTH_USER = `
    <ul class="${Constants.NAVIGATION_BAR_SELECTOR}__list">
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#'>Home</a></li>
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#catalog'>Catalog</a></li>
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#about-us'>About Us</a></li>
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#cart'>Cart</a></li>
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item"><a href='#my-profile'>My Profile</a></li>
      <li class="${Constants.NAVIGATION_BAR_SELECTOR}__item user-logout"><a href='#'>Logout</a></li>
    </ul>
  `;

  constructor() {
    super('nav', `${Constants.NAVIGATION_BAR_SELECTOR}`);
    this.LOCAL_STORAGE = new LocalStorage();
  }

  private handleLogoutLinkClick(): void {
    if (this.LOCAL_STORAGE.isLocalStorageItemExists(Constants.SUCCESSFUL_REGISTRATION_LOCAL_STORAGE_KEY)) {
      (document.querySelector('.user-logout') as HTMLAnchorElement).addEventListener('click', () => {
        this.LOCAL_STORAGE.removeLocalStorageItem(Constants.SUCCESSFUL_REGISTRATION_LOCAL_STORAGE_KEY);
        window.location.href = ProjectPages.Home;
      });
    }
  }

  private handleNavigationBarType(): void {
    if (this.LOCAL_STORAGE.isLocalStorageItemExists(Constants.SUCCESSFUL_REGISTRATION_LOCAL_STORAGE_KEY)) {
      this.CONTAINER.innerHTML = this.NAVIGATION_BAR_MARKUP_AUTH_USER;
      setTimeout(() => {
        this.handleLogoutLinkClick();
      }, 500);
    } else {
      this.CONTAINER.innerHTML = this.NAVIGATION_BAR_MARKUP_GUEST;
    }
  }

  public renderComponent(): HTMLElement {
    this.handleNavigationBarType();
    return this.CONTAINER;
  }
}

export default NavigationBar;
