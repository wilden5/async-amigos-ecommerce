/* eslint-disable @typescript-eslint/dot-notation */
import LoginPage from "../../../src/pages/login-page/LoginPage";

describe('LoginPage private methods', (): void => {
  let loginPage: LoginPage;

  beforeEach((): void => {
    loginPage = new LoginPage();
  });

  it('validateEmail should return true for a valid email', (): void => {
    const validEmail = 'test@example.com';
    const result = loginPage['validateEmail'](validEmail);
    expect(result).toBe(true);
  });

  it('validateEmail should return false for an invalid email', (): void => {
    const invalidEmail = 'invalid-email';
    const result = loginPage['validateEmail'](invalidEmail);
    expect(result).toBe(false);
  });

  it('validatePassword should return true for a valid password', (): void => {
    const validPassword = 'ValidPass123!';
    const result = loginPage['validatePassword'](validPassword);
    expect(result).toBe(true);
  });

  it('validatePassword should return false for an invalid password', (): void => {
    const invalidPassword = 'invalid';
    const result = loginPage['validatePassword'](invalidPassword);
    expect(result).toBe(false);
  });
});
