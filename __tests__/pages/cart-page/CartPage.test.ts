import CartPage from '../../../src/pages/cart-page/CartPage';

describe('CartPage', () => {
  let cartPage: CartPage;
  const containerId = 'test-container';
  const expectedPageMarkup = `<h1 class="page-title">Cart Page</h1>`;

  beforeEach(() => {
    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
    cartPage = new CartPage();
  });

  afterEach(() => {
    const container = document.querySelector(`#${containerId}`);
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('renderPage should render the cart page markup', () => {
    let container = document.querySelector(`#${containerId}`);
    expect(container?.innerHTML).toBe('');

    container = cartPage.renderPage();

    expect(container?.innerHTML).toContain(expectedPageMarkup.trim());
  });
});
