import { ClientResponse, CustomerSignInResult, CustomerSignin } from '@commercetools/platform-sdk';
import JustValidate, { Rules } from 'just-validate';
import ToastifyHelper from '../../utils/TostifyHelper';
import { CustomerLogin } from '../../backend/login/CustomerLogin';
import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import Constants from '../../utils/Constants';

class LoginPage extends Page {
  private LOGIN_PAGE_MARKUP = `
  <div class="container container-login">
  <div class="main-box login">
    <h2>Login</h2>
    <form id="login-form">
      <div class="input-box">
        <span class="icon"><i class='bx bxs-envelope'></i></span>
        <input class="input-email" type="email" autocomplete="email" name="email" >
        <label for="email">Email</label>
      </div>
      <div class="input-box">
        <span class="icon icon-lock"><i class='bx bxs-lock-alt'></i></span>
        <input class="input-password" type="password" autocomplete="current-password" name="password">
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

  private handleLoginResponse(response: ClientResponse<CustomerSignInResult>): void {
    if (response.statusCode === 200) {
      ToastifyHelper.showToast(Constants.LOGIN_SUCCESS, Constants.TOAST_COLOR_GREEN);
    } else {
      ToastifyHelper.showToast(Constants.LOGIN_ERROR, Constants.TOAST_COLOR_RED);
    }
  }

  private handleLoginFormSubmit = (event: Event): void => {
    event.preventDefault();

    const loginData: CustomerSignin = {
      email: (this.CONTAINER.querySelector('.input-email') as HTMLInputElement).value.trim(),
      password: (this.CONTAINER.querySelector('input[name="password"]') as HTMLInputElement).value.trim(),
    };

    new CustomerLogin(loginData)
      .signIn()
      .then((response): void => this.handleLoginResponse(response))
      .catch((error: Error): void => {
        const errorMessage =
          error.message === Constants.FAILED_TO_FETCH_ERROR_MESSAGE ? Constants.LOGIN_ERROR : error.message;
        ToastifyHelper.showToast(errorMessage, Constants.TOAST_COLOR_RED);
      });
  };

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
    (this.CONTAINER.querySelector('#login-form') as HTMLFormElement).addEventListener(
      'submit',
      this.handleLoginFormSubmit,
    );
  }

  // ! Just Validate --->
  private clientSideValidation(): void {
    const LOGIN_FORM = this.CONTAINER.querySelector('#login-form') as HTMLFormElement;
    const ValidationConfig = {
      validateBeforeSubmitting: true,
      focusInvalidField: true,
      testingMode: true,
    };

    const validator = new JustValidate(LOGIN_FORM, ValidationConfig);
    validator
      .addField('.input-email', [{ rule: Rules.Required }, { rule: Rules.Email }])
      .addField('.input-password', [{ rule: Rules.Required }, { rule: Rules.StrongPassword }]);
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.LOGIN_PAGE_MARKUP;
    this.clientSideValidation();
    this.assignLoginPageEventListeners();
    return this.CONTAINER;
  }
}

export default LoginPage;
