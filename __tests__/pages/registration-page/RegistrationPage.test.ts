import RegistrationPage from '../../../src/pages/registration-page/RegistrationPage';

jest.mock('./__mocks__/just-validate-plugin-date');

describe('RegistrationPage', (): void => {
  let registrationPage: RegistrationPage;
  let actualPageMarkup: HTMLElement;

  beforeEach((): void => {
    registrationPage = new RegistrationPage();

    const container = document.createElement('div');
    container.className = 'test-container';
    actualPageMarkup = registrationPage.renderPage();

    document.body.appendChild(container);
    container.appendChild(actualPageMarkup);
  });

  afterEach((): void => {
    const container = document.querySelector('.test-container');
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('Registration container should be present', () => {
    const containerRegister = actualPageMarkup.querySelector('.container.container-register');
    expect(containerRegister).not.toBeNull();
  });

  test('Registration form should be present', () => {
    const registerForm = actualPageMarkup.querySelector('.register-form');
    expect(registerForm).not.toBeNull();
  });

  test('Input box for email should be present within the form', () => {
    const emailInputBox = actualPageMarkup.querySelector('input[name="email"]');
    expect(emailInputBox).not.toBeNull();
  });
});
