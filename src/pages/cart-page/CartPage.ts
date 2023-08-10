import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';

class CartPage extends Page {
  private CART_PAGE_MARKUP = `
     <h1 class='header'>Cart Page</h1>`;

  constructor() {
    super(ProjectPages.Cart);
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.CART_PAGE_MARKUP;
    return this.CONTAINER;
  }
}

export default CartPage;
