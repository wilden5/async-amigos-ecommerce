import { fireEvent } from '@testing-library/dom';
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

  test('Login container should be present', (): void => {
    const containerLogin = actualPageMarkup.querySelector('.container.container-login');
    expect(containerLogin).not.toBeNull();
  });

  test('Login form should be present', (): void => {
    const loginForm = actualPageMarkup.querySelector('form#login-form');
    expect(loginForm).not.toBeNull();
  });

  test('Input box should be present within the form', (): void => {
    const inputBox = actualPageMarkup.querySelector('.input-box');
    expect(inputBox).not.toBeNull();
  });

  // ! LoginPage clientSideValidation
  it.skip('should perform client-side validation on login form', () => {
    const emailInput = actualPageMarkup.querySelector('.input-email') as HTMLInputElement;
    const passwordInput = actualPageMarkup.querySelector('.input-password') as HTMLInputElement;
    const submitButton = actualPageMarkup.querySelector('.main-btn') as HTMLButtonElement;

    fireEvent.click(submitButton);

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);
    expect(emailInput.parentElement?.classList).toContain('js-validate-error');

    fireEvent.change(passwordInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);
    expect(passwordInput.parentElement?.classList).toContain('js-validate-error');
  });
});
