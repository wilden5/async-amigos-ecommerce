import NotFoundPage from '../../../src/pages/not-found-page/NotFoundPage';

describe('ErrorPage', () => {
  let errorPage: NotFoundPage;
  const containerId = 'test-container';
  const expectedErrorPageMarkup = `<p class="error-message">Oops! The page you're looking for doesn't exist.</p>`;

  beforeEach(() => {
    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
    errorPage = new NotFoundPage();
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
