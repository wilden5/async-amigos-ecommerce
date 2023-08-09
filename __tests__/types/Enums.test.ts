import { ProjectPages } from '../../src/types/Enums';

describe('Enums', () => {
  test('ProjectPages enum values should match expected values', () => {
    const expectedValues: Record<string, string> = {
      HomePage: '',
      LoginPage: 'login',
      RegistrationPage: 'registration',
      NotFound: 'error-page',
    };

    expect(ProjectPages.Home).toBe(expectedValues.Home);
    expect(ProjectPages.Login).toBe(expectedValues.LoginPage);
    expect(ProjectPages.Registration).toBe(expectedValues.RegistrationPage);
    expect(ProjectPages.NotFound).toBe(expectedValues.NotFound);
  });
});
