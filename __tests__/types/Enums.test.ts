import { ProjectPages } from '../../src/types/Enums';

describe('Enums', () => {
  test('ProjectPages enum values should match expected values', () => {
    const expectedValues: Record<string, string> = {
      MainPage: 'main-page',
      LoginPage: 'login-page',
      RegistrationPage: 'registration-page',
      ErrorPage: 'error-page',
    };

    expect(ProjectPages.MainPage).toBe(expectedValues.MainPage);
    expect(ProjectPages.LoginPage).toBe(expectedValues.LoginPage);
    expect(ProjectPages.RegistrationPage).toBe(expectedValues.RegistrationPage);
    expect(ProjectPages.ErrorPage).toBe(expectedValues.ErrorPage);
  });
});
