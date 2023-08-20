/* eslint-disable no-console */
import { ClientResponse, CustomerSignInResult, CustomerSignin, ErrorResponse } from '@commercetools/platform-sdk';
import { apiRoot } from '../../backend/ctpClient/apiRoot';
import ToastifyHelper from '../../utils/TostifyHelper';
import { CustomerLogin } from '../../backend/login/CustomerLogin';
import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import Constants from '../../utils/Constants';
import LoginFormValidation from './LoginFormValidation';
import DOMHelpers from '../../utils/DOMHelpers';

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
      <button class="main-btn" type="submit" disabled>Login</button>
      <div class="register">
        <p class='customer-message'>New customer?<a href="#registration" class="register-link">Register</a></p>
      </div>
    </form>
  </div>
</div>`;

  private LOGIN_FORM_VALIDATION: LoginFormValidation;

  constructor() {
    super(ProjectPages.Login);
    this.LOGIN_FORM_VALIDATION = new LoginFormValidation();
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
    const customerLogin = new CustomerLogin(loginData);
    customerLogin
      .signIn()
      .then((response) => {
        this.handleLoginResponse(response);
        apiRoot.request = customerLogin.getApiRootWithToken();
      })
      .catch((error: ClientResponse<ErrorResponse>) => {
        const errorMessage = error.body.statusCode === 400 ? Constants.LOGIN_ERROR : error.body.message;
        ToastifyHelper.showToast(errorMessage, Constants.TOAST_COLOR_RED);
      });
  };

  public manageLoginFormEventListener = (add: boolean): void => {
    const form = this.CONTAINER.querySelector('#login-form') as HTMLFormElement;

    if (add) {
      form.addEventListener('submit', this.handleLoginFormSubmit);
    } else {
      form.removeEventListener('submit', this.handleLoginFormSubmit);
    }
  };

  private handleLockIconClickLoginPage(): void {
    const lockIcon = this.CONTAINER.querySelector(Constants.LOCK_ICON_SELECTOR) as HTMLElement;

    lockIcon.addEventListener('click', () => {
      DOMHelpers.showEnteredPassword(this.CONTAINER);
    });
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.LOGIN_PAGE_MARKUP;
    this.LOGIN_FORM_VALIDATION.validateLoginFormFields(this.CONTAINER, this.manageLoginFormEventListener);
    this.handleLockIconClickLoginPage();
    return this.CONTAINER;
  }
}

export default LoginPage;
