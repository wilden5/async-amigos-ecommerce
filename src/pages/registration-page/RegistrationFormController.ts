import { ClientResponse, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import Toastify from 'toastify-js';
import { CustomerRegistration } from '../../backend/registration/customer-registration';
import Constants from '../../utils/Constants';

export class RegistrationFormController {
  private registerForm: HTMLFormElement;

  private emailInput: HTMLInputElement;

  private passwordInput: HTMLInputElement;

  private firstNameInput: HTMLInputElement;

  private lastNameInput: HTMLInputElement;

  private dobInput: HTMLInputElement;

  private streetInput: HTMLInputElement;

  private cityInput: HTMLInputElement;

  private postalCodeInput: HTMLInputElement;

  private countrySelect: HTMLSelectElement;

  private acceptTermsCheckbox: HTMLInputElement;

  private customerRegistration: CustomerRegistration | null;

  constructor(registerForm: HTMLFormElement) {
    this.registerForm = registerForm;
    this.emailInput = registerForm.querySelector('input[name="email"]') as HTMLInputElement;
    this.passwordInput = registerForm.querySelector('input[name="password"]') as HTMLInputElement;
    this.firstNameInput = registerForm.querySelector('input[name="firstName"]') as HTMLInputElement;
    this.lastNameInput = registerForm.querySelector('input[name="lastName"]') as HTMLInputElement;
    this.dobInput = registerForm.querySelector('input[name="dob"]') as HTMLInputElement;
    this.streetInput = registerForm.querySelector('input[name="street"]') as HTMLInputElement;
    this.cityInput = registerForm.querySelector('input[name="city"]') as HTMLInputElement;
    this.postalCodeInput = registerForm.querySelector('input[name="postalCode"]') as HTMLInputElement;
    this.countrySelect = registerForm.querySelector('select[name="country"]') as HTMLSelectElement;
    this.acceptTermsCheckbox = registerForm.querySelector('input[name="acceptTerms"]') as HTMLInputElement;
    this.customerRegistration = null;
  }

  private showToast(message: string, hexToastColor: string): void {
    Toastify({
      text: message,
      duration: 5000,
      style: {
        background: hexToastColor,
      },
    }).showToast();
  }

  private handleRegistrationResponse(response: ClientResponse<CustomerSignInResult>): void {
    if (response.statusCode === 201) {
      this.showToast(Constants.ACCOUNT_HAS_BEEN_CREATED, Constants.TOAST_COLOR_GREEN);
    } else {
      this.showToast(Constants.ACCOUNT_CREATION_ERROR, Constants.TOAST_COLOR_RED);
    }
  }

  private handleSubmit(event: Event): void {
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const firstName = this.firstNameInput.value;
    const lastName = this.lastNameInput.value;
    const dateOfBirth = this.dobInput.value;
    const streetName = this.streetInput.value;
    const city = this.cityInput.value;
    const postalCode = this.postalCodeInput.value;
    const country = this.countrySelect.value;

    const customerData: CustomerDraft = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses: [
        {
          streetName,
          city,
          postalCode,
          country,
        },
      ],
    };
    this.customerRegistration = new CustomerRegistration(customerData);
    this.customerRegistration
      .createCustomer()
      .then((response) => {
        this.handleRegistrationResponse(response);
      })
      .catch((error: Error) => {
        this.showToast(error.message, Constants.TOAST_COLOR_RED);
      });
  }

  public addEventSubmit(): void {
    this.registerForm.addEventListener('submit', this.handleSubmit.bind(this));
  }
}
