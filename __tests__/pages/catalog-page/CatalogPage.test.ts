import CatalogPage from '../../../src/pages/catalog-page/CatalogPage';

describe('CatalogPage', () => {
  let catalogPage: CatalogPage;
  const containerId = 'test-container';
  const expectedPageMarkup = `<h1 class="header">Catalog Page</h1>`;

  beforeEach(() => {
    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
    catalogPage = new CatalogPage();
  });

  afterEach(() => {
    const container = document.querySelector(`#${containerId}`);
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('renderPage should render the catalog page markup', () => {
    let container = document.querySelector(`#${containerId}`);
    expect(container?.innerHTML).toBe('');

    container = catalogPage.renderPage();

    expect(container?.innerHTML).toContain(expectedPageMarkup.trim());
  });
});
