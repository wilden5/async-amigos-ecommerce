/* eslint-disable no-console */
/* eslint-disable no-alert */
import { CustomerLogin } from '../../backend/login/customer-login';

export class LoginFormController {
  private loginForm: HTMLFormElement;

  private emailInput: HTMLInputElement;

  private passwordInput: HTMLInputElement;

  private customerLogin: CustomerLogin | null;

  constructor(loginForm: HTMLFormElement) {
    this.loginForm = loginForm;
    this.emailInput = loginForm.querySelector('input[name="email"]') as HTMLInputElement;
    this.passwordInput = loginForm.querySelector('input[name="password"]') as HTMLInputElement;
    this.customerLogin = null;
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const loginData = { email, password };
    this.customerLogin = new CustomerLogin(loginData);
    this.customerLogin
      .signIn()
      .then((response) => {
        if (response.statusCode === 200) {
          alert('Login Successful');
        } else {
          alert('Login failed');
        }
      })
      .catch((error: Error) => {
        alert(error.message);
        console.log(error.message);
      });
  }

  public addEventSubmit(): void {
    this.loginForm.addEventListener('submit', this.handleSubmit.bind(this));
  }
}
