import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import Constants from '../../utils/Constants';
import EmailValidator from '../../utils/ValidateEmail';
import PasswordValidator from '../../utils/ValidatePassword';

class RegistrationPage extends Page {
  private REGISTRATION_PAGE_MARKUP = `
  <div class="container container-register">
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
          <span class="icon"><i class='bx bxs-traffic'></i></span>
          <input type="text" name="street" required>
          <label for="street">Street</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bxs-city'></i></span>
          <input type="text" name="city" pattern="[A-Za-z]+" required>
          <label for="city">City</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bxs-building-house'></i></span>
          <input type="text" name="postalCode" pattern="[A-Za-z0-9\\s]+" required>
          <label for="postalCode">Postal Code</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bx-globe'></i></span>
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
          <p>Already a Customer?<a href="#login" class="login-link">Login</a></p>
        </div>
      </form>
    </div>
  </div>`;

  constructor() {
    super(ProjectPages.Registration);
  }

  renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.REGISTRATION_PAGE_MARKUP;
    this.assignLoginPageEventListeners();
    this.setupRealTimeValidation();
    return this.CONTAINER;
  }

  private handleLockIconClick = (event: Event): void => {
    const target = event.currentTarget as HTMLElement;
    const passwordInput = this.CONTAINER.querySelector('.input-password') as HTMLInputElement;

    if (!passwordInput.value) {
      return;
    }

    if (passwordInput.type === 'password') {
      target.innerHTML = Constants.OPENED_LOCK_ICON_MARKUP;
      passwordInput.type = 'text';
    } else if (passwordInput.type === 'text') {
      target.innerHTML = Constants.CLOSED_LOCK_ICON_MARKUP;
      passwordInput.type = 'password';
    }
  };

  private assignLoginPageEventListeners(): void {
    const lockIcon = this.CONTAINER.querySelector(Constants.LOCK_ICON_SELECTOR) as HTMLElement;
    lockIcon.addEventListener('click', this.handleLockIconClick);
  }

  private setupRealTimeValidation(): void {
    const emailInput = this.CONTAINER.querySelector('input[name="email"]') as HTMLInputElement;
    emailInput.addEventListener('change', (): void => {
      const email: string = emailInput.value;
      if (typeof EmailValidator.validate(email) === 'boolean') return;
      if (typeof EmailValidator.validate(email) === 'string') {
        console.log(EmailValidator.validate(email));
      }
    });

    const passInput = this.CONTAINER.querySelector('input[name="password"]') as HTMLInputElement;
    passInput.addEventListener('change', (): void => {
      const password: string = passInput.value;
      if (typeof PasswordValidator.validate(password) === 'boolean') return;
      if (typeof PasswordValidator.validate(password) === 'string') {
        console.log(PasswordValidator.validate(password));
      }
    });
  }
}

export default RegistrationPage;
