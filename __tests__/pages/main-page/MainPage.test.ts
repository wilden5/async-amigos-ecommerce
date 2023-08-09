import HomePage from '../../../src/pages/home-page/HomePage';

describe('MainPage', () => {
  let mainPage: HomePage;
  const containerId = 'test-container';
  const expectedMainPageMarkup = `<h1 class="header">Main Page</h1>`;

  beforeEach(() => {
    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
    mainPage = new HomePage();
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
