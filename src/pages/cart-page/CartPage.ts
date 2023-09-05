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

  private displayCartProducts(): void {
    const usLocaleKey = 'en-US';
    new CustomerCart()
      .getMyActiveCart(this.LOCAL_STORAGE.getLocalStorageItem(Constants.ACCESS_TOKEN_KEY) as string)
      .then((activeCart) => {
        const cartDetails = this.CONTAINER.querySelector('.cart-details') as HTMLElement;
        activeCart.results[0].lineItems.forEach((item) => {
          const cartItem = DOMHelpers.createElement(
            'div',
            { className: `${item.productKey as string} cart-item` },
            cartDetails,
          );
          cartItem.innerText = `${item.name[usLocaleKey]} ${item.price.value.centAmount}`;
        });
      })
      .catch((error: Error): void => {
        PromiseHelpers.catchBlockHelper(error, error.message);
      });
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.CART_PAGE_MARKUP;
    this.displayCartProducts();
    return this.CONTAINER;
  }
}

export default CartPage;
