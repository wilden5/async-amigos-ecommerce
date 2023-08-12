import Page from '../../components/templates/Page';
import { EmailHints, PasswordHints, ProjectPages } from '../../types/Enums';
import Constants from '../../utils/Constants';
import { LoginFormController } from './LoginFormController';
import EmailValidator from '../../utils/ValidateEmail';
import PasswordValidator from '../../utils/ValidatePassword';
import RealTimeValidationFactory from '../../utils/RealTimeValidationFactory';

class LoginPage extends Page {
  private LOGIN_PAGE_MARKUP = `
  <div class="container container-login">
  <div class="main-box login">
    <h2>Login</h2>
    <form id="login-form">
      <div class="input-box">
        <span class="icon"><i class='bx bxs-envelope'></i></span>
        <input type="email" autocomplete="current-email" name="email">
        <label for="email">Email</label>
      </div>
      <div class="input-box">
        <span class="icon icon-lock"><i class='bx bxs-lock-alt'></i></span>
        <input type="password" autocomplete="current-password" name="password" class="input-password">
        <label for="password">Password</label>
      </div>
      <button class="main-btn" type="submit">Login</button>
      <div class="register">
        <p class='new-customer-message'>New customer?<a href="#registration" class="register-link">Register</a></p>
      </div>
    </form>
  </div>
</div>`;

  constructor() {
    super(ProjectPages.Login);
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.LOGIN_PAGE_MARKUP;
    this.assignLoginPageEventListeners();

    const emailInput = this.CONTAINER.querySelector('input[name="email"]') as HTMLInputElement;
    const passInput = this.CONTAINER.querySelector('input[name="password"]') as HTMLInputElement;

    const emailValidationHints = {
      [EmailHints.EmailFormatHint]: EmailHints.EmailFormatHint,
    };
    RealTimeValidationFactory.setupValidation(
      emailInput,
      EmailValidator.validate.bind(EmailValidator),
      emailValidationHints,
    );

    const passValidationHints = {
      [PasswordHints.LengthHint]: PasswordHints.LengthHint,
      [PasswordHints.UpperLettersHint]: PasswordHints.UpperLettersHint,
      [PasswordHints.LowerLettersHint]: PasswordHints.LowerLettersHint,
      [PasswordHints.DigitsHint]: PasswordHints.DigitsHint,
      [PasswordHints.SpacesHint]: PasswordHints.SpacesHint,
      [PasswordHints.SpecialCharsHint]: PasswordHints.SpecialCharsHint,
    };
    RealTimeValidationFactory.setupValidation(
      passInput,
      PasswordValidator.validate.bind(PasswordValidator),
      passValidationHints,
    );

    this.handleSubmit();
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

  private handleSubmit(): void {
    const loginForm = this.CONTAINER.querySelector('#login-form') as HTMLFormElement;
    const loginFormController = new LoginFormController(loginForm);
    loginFormController.addEventSubmit();
  }
}

export default LoginPage;
