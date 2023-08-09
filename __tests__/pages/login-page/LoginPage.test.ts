import LoginPage from '../../../src/pages/login-page/LoginPage';

describe('LoginPage', (): void => {
  let loginPage: LoginPage;
  const containerId = 'test-container';
  const expectedLoginPageMarkup =
    `<div class="container-login"><div class="main-box login"><h2>Login</h2><form id="login-form"><div class="input-box"><span class="icon"><i class='bx bxs-envelope'></i></span><input type="email" autocomplete="current-email" name="email" required><label for="email">Email</label></div><div class="input-box"><span class="icon icon-lock"><i class='bx bxs-lock-alt'></i></span><input type="password" autocomplete="current-password" name="password" class="input-password" required><label for="password">Password</label></div><button class="main-btn" type="submit">Login</button><div class="register"><p>New customer?<a href="/#registration-page" class="register-link">Register</a></p></div></form></div></div>`.replace(
      /required=""/g,
      'required',
    );

  beforeEach((): void => {
    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
    loginPage = new LoginPage();
  });

  afterEach((): void => {
    const container = document.querySelector(`#${containerId}`);
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('renderPage should render the login page markup', (): void => {
    let container = document.querySelector(`#${containerId}`);
    expect(container?.innerHTML).toBe('');

    container = loginPage.renderPage();

    const receivedMarkup = container?.innerHTML.trim();
    const expectedMarkup = expectedLoginPageMarkup.trim();

    if (receivedMarkup !== expectedMarkup) {
      console.log('Expected:');
      console.log(expectedMarkup);
      console.log('Received:');
      console.log(receivedMarkup);
    }

    expect(container?.innerHTML).toContain(expectedLoginPageMarkup.trim());
  });
});
