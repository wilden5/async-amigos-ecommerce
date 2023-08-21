import AboutUsPage from '../../../src/pages/about-us-page/AboutUsPage';

describe('MyProfilePage', () => {
  let aboutUsPage: AboutUsPage;
  const containerId = 'test-container';
  const expectedPageMarkup = `<h1 class="page-title">About Us Page</h1>`;

  beforeEach(() => {
    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
    aboutUsPage = new AboutUsPage();
  });

  afterEach(() => {
    const container = document.querySelector(`#${containerId}`);
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('renderPage should render the about us page markup', () => {
    let container = document.querySelector(`#${containerId}`);
    expect(container?.innerHTML).toBe('');

    container = aboutUsPage.renderPage();

    expect(container?.innerHTML).toContain(expectedPageMarkup.trim());
  });
});
