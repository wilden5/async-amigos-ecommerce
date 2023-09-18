import Component from '../templates/Component';
import headerLogo from '../../assets/header-logo2.png';
import cart from '../../assets/cart.png';
import Constants from '../../utils/Constants';
import CustomerCart from '../../backend/cart/CustomerCart';
import PromiseHelpers from '../../utils/PromiseHelpers';
import LocalStorage from '../../utils/LocalStorage';

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
      <a class='cart-counter-container' href='#cart'>
        <div class='cart-circle'>
          <span class='cart-items-count'></span>
        </div>
        <img src='${cart}' alt='cart-image' class='cart-image'>
      </a>
    </div>
  `;

  customerCart: CustomerCart;

  constructor() {
    super('header', `${Constants.HEADER}`);
    this.customerCart = new CustomerCart();
    this.showHeaderMenu();
    document.addEventListener('click', () => {
      setTimeout(() => {
        this.customerCart
          .getMyActiveCart(new LocalStorage().getLocalStorageItem(Constants.ACCESS_TOKEN_KEY) as string)
          .then((activeCartResponse): void => {
            const itemCount = activeCartResponse.results[0].lineItems.length;
            const cartItemCountElement = document.querySelector('.cart-items-count') as HTMLElement;
            cartItemCountElement.textContent = `${itemCount}`;
          })
          .catch((error: Error): void => {
            PromiseHelpers.catchBlockHelper(error, Constants.FETCH_CART_TYPES_ERROR);
          });
      }, 200);
    });
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
    return this.CONTAINER;
  }
}

export default Header;
