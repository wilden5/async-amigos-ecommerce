import LoginPage from '../../../src/pages/login-page/LoginPage';

describe('LoginPage', () => {
  let loginPage: LoginPage;
  const containerId = 'test-container';
  const expectedLoginPageMarkup = `<h1 class="header">Login Page</h1>`;

  beforeEach(() => {
    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
    loginPage = new LoginPage(containerId);
  });

  afterEach(() => {
    const container = document.querySelector(`#${containerId}`);
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('renderPage should render the login page markup', () => {
    let container = document.querySelector(`#${containerId}`);
    expect(container?.innerHTML).toBe('');

    container = loginPage.renderPage();

    expect(container?.innerHTML).toContain(expectedLoginPageMarkup.trim());
  });
});
