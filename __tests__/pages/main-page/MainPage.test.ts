import MainPage from '../../../src/pages/main-page/MainPage';

describe('MainPage', () => {
  let mainPage: MainPage;
  const containerId = 'test-container';
  const expectedMainPageMarkup = `<h1 class="header">Main Page</h1>`;

  beforeEach(() => {
    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
    mainPage = new MainPage(containerId);
  });

  afterEach(() => {
    const container = document.querySelector(`#${containerId}`);
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('renderPage should render the main page markup', () => {
    let container = document.querySelector(`#${containerId}`);
    expect(container?.innerHTML).toBe('');

    container = mainPage.renderPage();

    expect(container?.innerHTML).toContain(expectedMainPageMarkup.trim());
  });
});
