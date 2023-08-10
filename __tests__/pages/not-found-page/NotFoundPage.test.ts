import NotFoundPage from '../../../src/pages/not-found-page/NotFoundPage';

jest.mock('../../../src/assets/not-found-image.png', () => ({
  default: 'mock-image',
}));

describe('NotFoundPage', () => {
  let notFoundPage: NotFoundPage;
  const containerId = 'test-container';
  let actualPageMarkup: HTMLElement;

  beforeEach(() => {
    notFoundPage = new NotFoundPage();

    const container = document.createElement('div');
    container.className = containerId;
    actualPageMarkup = notFoundPage.renderPage();
    document.body.appendChild(container);
  });

  afterEach(() => {
    const container = document.querySelector(`.${containerId}`);
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('Error message should be present', () => {
    const errorMessage = actualPageMarkup.querySelector('.error-message');
    expect(errorMessage).not.toBeNull();
  });

  test('Navigate to home button should be present', () => {
    const navigateToHomeButton = actualPageMarkup.querySelector('a[href="#"]');
    expect(navigateToHomeButton).not.toBeNull();
  });
});
