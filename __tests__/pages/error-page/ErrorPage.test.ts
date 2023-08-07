import ErrorPage from '../../../src/pages/error-page/ErrorPage';

describe('ErrorPage', () => {
  let errorPage: ErrorPage;
  const containerId = 'test-container';
  const expectedErrorPageMarkup = `<h1 class="header">404 Page was not found</h1>`;

  beforeEach(() => {
    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
    errorPage = new ErrorPage(containerId);
  });

  afterEach(() => {
    const container = document.querySelector(`#${containerId}`);
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('renderPage should render the error page markup', () => {
    let container = document.querySelector(`#${containerId}`);
    expect(container?.innerHTML).toBe('');

    container = errorPage.renderPage();

    expect(container?.innerHTML).toContain(expectedErrorPageMarkup.trim());
  });
});
