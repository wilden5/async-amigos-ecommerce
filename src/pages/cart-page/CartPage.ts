import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import CustomerCart from '../../backend/cart/CustomerCart';
import LocalStorage from '../../utils/LocalStorage';
import Constants from '../../utils/Constants';
import DOMHelpers from '../../utils/DOMHelpers';
import PromiseHelpers from '../../utils/PromiseHelpers';

class CartPage extends Page {
  private CART_PAGE_MARKUP = `
    <div class="cart__container">
      <h1 class='page-title'>Cart Page</h1>
      <div class='cart-details'></div>
    </div>`;

  private LOCAL_STORAGE: LocalStorage;

  constructor() {
    super(ProjectPages.Cart);
    this.LOCAL_STORAGE = new LocalStorage();
  }

  private showCartProducts(): void {
    const usLocaleKey = 'en-US';
    new CustomerCart()
      .getMyActiveCart(this.LOCAL_STORAGE.getLocalStorageItem(Constants.ACCESS_TOKEN_KEY) as string)
      .then((activeCart) => {
        const cartDetails = this.CONTAINER.querySelector('.cart-details') as HTMLElement;
        const cartItemsNumber = activeCart.results[0].lineItems.length;
        if (cartItemsNumber > 0) {
          activeCart.results[0].lineItems.forEach((item) => {
            const cartItem = DOMHelpers.createElement(
              'div',
              { className: `${item.productKey as string} cart-item` },
              cartDetails,
            );
            cartItem.innerText = `${item.name[usLocaleKey]} ${item.price.value.centAmount}`;
          });
        } else {
          this.showEmptyCartMessage();
        }
      })
      .catch((error: Error): void => {
        PromiseHelpers.catchBlockHelper(error, error.message);
      });
  }

  private showEmptyCartMessage(): void {
    const parent = this.CONTAINER.querySelector('.cart-details') as HTMLDivElement;
    const element = DOMHelpers.createElement('div', { className: `empty-cart` }, parent);
    element.innerText = 'CART IS EMPTY!';
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.CART_PAGE_MARKUP;
    new CustomerCart()
      .handleCartCreation()
      .then(() => {
        this.showCartProducts();
      })
      .catch((error: Error): void => {
        PromiseHelpers.catchBlockHelper(error, error.message);
      });
    return this.CONTAINER;
  }
}

export default CartPage;
