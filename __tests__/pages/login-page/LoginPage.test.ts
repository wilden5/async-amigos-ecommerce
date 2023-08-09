import LoginPage from '../../../src/pages/login-page/LoginPage';

describe('LoginPage', (): void => {
  let loginPage: LoginPage;
  let actualPageMarkup: HTMLElement;

  beforeEach((): void => {
    loginPage = new LoginPage();

    const container = document.createElement('div');
    container.className = 'test-container';
    actualPageMarkup = loginPage.renderPage();

    document.body.appendChild(container);
    container.appendChild(actualPageMarkup);
  });

  afterEach((): void => {
    const container = document.querySelector('.test-container');
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('Login container should be present', () => {
    const containerLogin = actualPageMarkup.querySelector('.container.container-login');
    expect(containerLogin).not.toBeNull();
  });

  test('Login form should be present', () => {
    const loginForm = actualPageMarkup.querySelector('form#login-form');
    expect(loginForm).not.toBeNull();
  });

  test('Input box should be present within the form', () => {
    const inputBox = actualPageMarkup.querySelector('.input-box');
    expect(inputBox).not.toBeNull();
  });
});
