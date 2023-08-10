import { ProjectPages } from '../../src/types/Enums';

describe('Enums', () => {
  test('ProjectPages enum values should match expected values', () => {
    const expectedValues: Record<string, string> = {
      HomePage: '',
      LoginPage: 'login',
      RegistrationPage: 'registration',
      CatalogPage: 'catalog',
      MyProfilePage: 'my-profile',
      CartPage: 'cart',
      AboutUsPage: 'about-us',
      NotFound: 'not-found',
    };

    expect(ProjectPages.Home).toBe(expectedValues.HomePage);
    expect(ProjectPages.Login).toBe(expectedValues.LoginPage);
    expect(ProjectPages.Registration).toBe(expectedValues.RegistrationPage);
    expect(ProjectPages.Catalog).toBe(expectedValues.CatalogPage);
    expect(ProjectPages.MyProfile).toBe(expectedValues.MyProfilePage);
    expect(ProjectPages.Cart).toBe(expectedValues.CartPage);
    expect(ProjectPages.AboutUs).toBe(expectedValues.AboutUsPage);
    expect(ProjectPages.NotFound).toBe(expectedValues.NotFound);
  });
});
