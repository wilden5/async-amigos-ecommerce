import { fireEvent } from '@testing-library/dom';
import LoginPage from '../../../src/pages/login-page/LoginPage';
import Constants from '../../../src/utils/Constants';

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
  test('should perform client-side validation for Login Form', (done) => {
    const emailInput = actualPageMarkup.querySelector('.input-email') as HTMLInputElement;
    const submitButton = actualPageMarkup.querySelector('.main-btn') as HTMLButtonElement;
    const passwordInput = actualPageMarkup.querySelector('.input-password') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    const checkInterval = setInterval(() => {
      const emailErrorLabel = actualPageMarkup.querySelector('[data-test-id="error-label-1"]');
      const passwordErrorLabel = actualPageMarkup.querySelector('[data-test-id="error-label-2"]');
      if (emailErrorLabel !== null && passwordErrorLabel !== null) {
        clearInterval(checkInterval);
        expect(emailErrorLabel.textContent).toContain(Constants.INVALID_EMAIL_ERROR_MESSAGE);
        expect(passwordErrorLabel.textContent).toContain(Constants.INVALID_PASSWORD_ERROR_MESSAGE);
        done();
      }
    }, 100);
  });
});
