import { CartPagedQueryResponse } from '@commercetools/platform-sdk';
import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import CustomerCart from '../../backend/cart/CustomerCart';
import LocalStorage from '../../utils/LocalStorage';
import Constants from '../../utils/Constants';
import DOMHelpers from '../../utils/DOMHelpers';
import PromiseHelpers from '../../utils/PromiseHelpers';
import ProductCardBuilder from '../catalog-page/ProductCardBuilder';

class CartPage extends Page {
  private CART_PAGE_MARKUP = `
    <div class="cart-container">
      <h1 class='cart-page-title'>Your Cart</h1>
      <div class='cart-items'></div>
      <div class='total-cart-price-container'></div>
    </div>`;

  private LOCAL_STORAGE: LocalStorage;

  private CUSTOMER_CART: CustomerCart;

  constructor() {
    super(ProjectPages.Cart);
    this.LOCAL_STORAGE = new LocalStorage();
    this.CUSTOMER_CART = new CustomerCart();
  }

  private buildCartItems(cartResponse: CartPagedQueryResponse): void {
    const itemContainer = this.CONTAINER.querySelector('.cart-items') as HTMLElement;
    const usLocaleKey = 'en-US';
    cartResponse.results[0].lineItems.forEach((cartItem) => {
      const cartItemTitle = cartItem.name[usLocaleKey];
      const cartItemPrice = cartItem.price.discounted?.value.centAmount
        ? cartItem.price.discounted?.value.centAmount
        : cartItem.price.value.centAmount;
      const modifiedPriceByItemQuantity = ProductCardBuilder.convertProductPrice(
        Number(cartItemPrice) * cartItem.quantity,
      );
      const cartItemImg = cartItem.variant.images?.[0].url ?? Constants.IMAGE_NOT_FOUND_MOCK_IMAGE;
      const itemQuantity = cartItem.quantity;
      const lineItemId = cartItem.id;

      const cartElement = DOMHelpers.createElement(
        'div',
        { className: `${cartItem.productId} cart-item` },
        itemContainer,
      );
      cartElement.innerHTML = `<img class="cart-item-img" src="${cartItemImg}" alt="${cartItem.productKey as string}">
           <h2 class='cart-item-title'>${cartItemTitle}</h2> 
           <div class="cart-item-quantity">
              <button class="cart-item-quantity-minus ${lineItemId} ${cartItem.productId}">-</button>
              <input type="number" class="cart-item-quantity-value ${
                cartItem.productId
              }" value=${itemQuantity} disabled>
              <button class="cart-item-quantity-plus ${cartItem.productId}">+</button>
           </div>
           <div class='cart-item-price'>${modifiedPriceByItemQuantity}</div>`;
    });
    this.increaseItemQuantity();
    this.decreaseItemQuantity();
  }

  private increaseItemQuantity(): void {
    const buttons = this.CONTAINER.querySelectorAll('.cart-item-quantity-plus');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.classList[1];
        this.CUSTOMER_CART.addCartItem(
          this.LOCAL_STORAGE.getLocalStorageItem(Constants.CART_ID_KEY) as string,
          productId,
        )
          .then(() => {
            this.updateRelatedToProductQuantityElements(productId);
          })
          .catch((error: Error): void => {
            PromiseHelpers.catchBlockHelper(error, error.message);
          });
      });
    });
  }

  private decreaseItemQuantity(): void {
    const buttons = this.CONTAINER.querySelectorAll('.cart-item-quantity-minus');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const lineItemId = button.classList[1];
        const productId = button.classList[2];

        this.CUSTOMER_CART.removeCartItem(
          this.LOCAL_STORAGE.getLocalStorageItem(Constants.CART_ID_KEY) as string,
          lineItemId,
        )
          .then(() => {
            this.updateRelatedToProductQuantityElements(productId);
          })
          .catch((error: Error): void => {
            PromiseHelpers.catchBlockHelper(error, error.message);
          });
      });
    });
  }

  private updateRelatedToProductQuantityElements(productId: string): void {
    this.CUSTOMER_CART.getMyActiveCart(this.LOCAL_STORAGE.getLocalStorageItem(Constants.ACCESS_TOKEN_KEY) as string)
      .then((activeCart) => {
        const cartTotalPrice = ProductCardBuilder.convertProductPrice(
          Number(activeCart.results[0].totalPrice.centAmount),
        );
        let itemQuantity: number;
        let itemTotalPrice: string;
        activeCart.results[0].lineItems.forEach((item) => {
          if (item.productId === productId) {
            itemQuantity = item.quantity;
            itemTotalPrice = ProductCardBuilder.convertProductPrice(item.totalPrice.centAmount);
          }
        });
        (this.CONTAINER.querySelector('.total-cart-price') as HTMLSpanElement).textContent = cartTotalPrice;
        const itemQuantityElement = this.CONTAINER.querySelectorAll('.cart-item');
        itemQuantityElement.forEach((item) => {
          if (item.classList[0] === productId) {
            const cartItemQuantityElement = item.querySelector('.cart-item-quantity-value') as HTMLInputElement;
            const cartItemPriceElement = item.querySelector('.cart-item-price') as HTMLInputElement;
            cartItemQuantityElement.value = String(itemQuantity);
            cartItemPriceElement.textContent = itemTotalPrice;
          }
        });
        this.CUSTOMER_CART.getCartInformation(activeCart).catch((error: Error): void => {
          PromiseHelpers.catchBlockHelper(error, error.message);
        });
      })
      .catch((error: Error): void => {
        PromiseHelpers.catchBlockHelper(error, error.message);
      });
  }

  private populateCartTotalPriceContainer(cartResponse: CartPagedQueryResponse): void {
    const container = this.CONTAINER.querySelector('.total-cart-price-container') as HTMLDivElement;
    const totalCartPrice = ProductCardBuilder.convertProductPrice(
      Number(cartResponse.results[0].totalPrice.centAmount),
    );
    container.innerHTML = `<div class='total-cart-price-label'>Total cart price:</div> <span class='total-cart-price'>${totalCartPrice}</span>`;
  }

  private renderCart(): void {
    this.CUSTOMER_CART.getMyActiveCart(this.LOCAL_STORAGE.getLocalStorageItem(Constants.ACCESS_TOKEN_KEY) as string)
      .then((activeCart) => {
        this.buildCartItems(activeCart);
        this.populateCartTotalPriceContainer(activeCart);
        this.CUSTOMER_CART.getCartInformation(activeCart).catch((error: Error): void => {
          PromiseHelpers.catchBlockHelper(error, error.message);
        });
      })
      .catch((error: Error): void => {
        PromiseHelpers.catchBlockHelper(error, error.message);
      });
  }

  private showEmptyCartMessage(): void {
    const parent = this.CONTAINER.querySelector('.cart-items') as HTMLDivElement;
    const element = DOMHelpers.createElement('div', { className: `empty-cart` }, parent);
    element.innerText = 'CART IS EMPTY!';
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.CART_PAGE_MARKUP;
    this.CUSTOMER_CART.handleCartCreation()
      .then(() => {
        this.renderCart();
      })
      .catch((error: Error): void => {
        PromiseHelpers.catchBlockHelper(error, error.message);
      });
    return this.CONTAINER;
  }
}

export default CartPage;
