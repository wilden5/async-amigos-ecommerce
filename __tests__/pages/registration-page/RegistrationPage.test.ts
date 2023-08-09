import RegistrationPage from '../../../src/pages/registration-page/RegistrationPage';

describe('RegistrationPage', (): void => {
  let registrationPage: RegistrationPage;
  const containerId = 'test-container';
  const expectedRegistrationPageMarkup = `
  <div class="container-login">
    <div class="main-box register">
      <h2>Registration</h2>
      <form id="register-form">
        <div class="input-box">
          <span class="icon"><i class='bx bxs-envelope'></i></span>
            <input type="email" name="email" required>
            <label for="email">Email</label>
        </div>
        <div class="input-box">
          <span class="icon icon-lock"><i class='bx bxs-lock-alt'></i></span>
          <input type="password" name="password" class="input-password" required>
          <label for="password">Password</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bxs-user'></i></span>
          <input type="text" name="firstName" pattern="[A-Za-z]+" required>
          <label for="firstName">First Name</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bxs-user'></i></span>
          <input type="text" name="lastName" pattern="[A-Za-z]+" required>
          <label for="lastName">Last Name</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bxs-calendar'></i></span>
          <input type="date" name="dob" required>
          <label for="dob">Date of Birth</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bxs-house'></i></span>
          <input type="text" name="street" required>
          <label for="street">Street</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bxs-city'></i></span>
          <input type="text" name="city" pattern="[A-Za-z]+" required>
          <label for="city">City</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bxs-mailbox'></i></span>
          <input type="text" name="postalCode" pattern="[A-Za-z0-9\\s]+" required>
          <label for="postalCode">Postal Code</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bxs-globe'></i></span>
          <select name="country" required>
            <option value="" disabled selected>Select Country</option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <!-- Add more countries here -->
          </select>
        </div>
        <div class="check">
          <label for="acceptTerms">
            <input type="checkbox" name="acceptTerms">I accept terms and conditions</input>
          </label>
        </div>
        <button class="main-btn" type="submit">Register me</button>
        <div class="register">
          <p>Already a Customer?<a href="/#login-page" class="login-link">Login</a></p>
        </div>
      </form>
    </div>
  </div>`;

  beforeEach((): void => {
    const container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
    registrationPage = new RegistrationPage();
  });

  afterEach((): void => {
    const container = document.querySelector(`#${containerId}`);
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('renderPage should render the registration page markup', (): void => {
    let container = document.querySelector(`#${containerId}`);
    expect(container?.innerHTML).toBe('');

    container = registrationPage.renderPage();

    expect(container?.innerHTML).toContain(expectedRegistrationPageMarkup.trim());
  });
});
