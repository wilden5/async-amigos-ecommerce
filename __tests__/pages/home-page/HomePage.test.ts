import HomePage from '../../../src/pages/home-page/HomePage';

describe('HomePage', () => {
  let homePage: HomePage;
  const containerId = 'test-container';
  const expectedPageMarkup = `<div class="home-container">
        <h1 class="home-page-title">Discover Amazing Discounts, Dive into Savings!</h1>
        <div class="special-offers"></div>
        <a href="#catalog" class="explore-button">Explore our catalog</a>
    </div> `;

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
