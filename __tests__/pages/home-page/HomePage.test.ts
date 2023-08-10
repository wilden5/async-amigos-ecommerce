import HomePage from '../../../src/pages/home-page/HomePage';

describe('HomePage', () => {
  let homePage: HomePage;
  const containerId = 'test-container';
  const expectedPageMarkup = `<h1 class="header">Home Page</h1>`;

  beforeEach(() => {
    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
    homePage = new HomePage();
  });

  afterEach(() => {
    const container = document.querySelector(`#${containerId}`);
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('renderPage should render the home page markup', () => {
    let container = document.querySelector(`#${containerId}`);
    expect(container?.innerHTML).toBe('');

    container = homePage.renderPage();

    expect(container?.innerHTML).toContain(expectedPageMarkup.trim());
  });
});
