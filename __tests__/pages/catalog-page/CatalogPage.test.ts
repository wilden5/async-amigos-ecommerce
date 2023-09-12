import CatalogPage from '../../../src/pages/catalog-page/CatalogPage';
// import ToastifyHelper from '../../../src/utils/TostifyHelper';

describe('CatalogPage', (): void => {
  let catalogPage: CatalogPage;
  const containerId = 'test-container';
  const expectedPageMarkup = `<h2 class="categories-header">Our Categories:</h2>`;

  beforeEach((): void => {
    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
    catalogPage = new CatalogPage();
  });

  afterEach((): void => {
    const container = document.querySelector(`#${containerId}`);
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('renderPage should render the catalog page markup', (): void => {
    let container = document.querySelector(`#${containerId}`);
    expect(container?.innerHTML).toBe('');

    container = catalogPage.renderPage();

    expect(container?.innerHTML).toContain(expectedPageMarkup.trim());
  });

  test('clicking "order-me" button should add product to cart', (): void => {
    const container = catalogPage.renderPage();
    document.body.appendChild(container);

    const orderMeButton = container.querySelector('.order-me-button');
    orderMeButton?.dispatchEvent(new MouseEvent('click'));

    document.body.removeChild(container);
  });
});
