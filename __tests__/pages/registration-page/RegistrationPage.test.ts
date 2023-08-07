import RegistrationPage from '../../../src/pages/registration-page/RegistrationPage';

describe('RegistrationPage', () => {
  let registrationPage: RegistrationPage;
  const containerId = 'test-container';
  const expectedRegistrationPageMarkup = `<h1 class="header">Registration Page</h1>`;

  beforeEach(() => {
    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
    registrationPage = new RegistrationPage();
  });

  afterEach(() => {
    const container = document.querySelector(`#${containerId}`);
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('renderPage should render the registration page markup', () => {
    let container = document.querySelector(`#${containerId}`);
    expect(container?.innerHTML).toBe('');

    container = registrationPage.renderPage();

    expect(container?.innerHTML).toContain(expectedRegistrationPageMarkup.trim());
  });
});
