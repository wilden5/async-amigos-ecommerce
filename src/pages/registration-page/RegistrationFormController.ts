/* eslint-disable no-console */
/* eslint-disable no-alert */
import { CustomerDraft } from '@commercetools/platform-sdk';
import { CustomerRegistration } from '../../backend/registration/customer-registration';

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

  private handleSubmit(event: Event): void {
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const firstName = this.firstNameInput.value;
    const lastName = this.lastNameInput.value;
    // const dateOfBirth = this.dobInput.value;
    const streetName = this.streetInput.value;
    const city = this.cityInput.value;
    const postalCode = this.postalCodeInput.value;
    const country = this.countrySelect.value;

    const customerData: CustomerDraft = {
      email,
      password,
      firstName,
      lastName,
      // dateOfBirth,
      addresses: [
        {
          streetName,
          city,
          postalCode,
          country,
        },
      ],
    };
    console.log(customerData);
    this.customerRegistration = new CustomerRegistration(customerData);
    this.customerRegistration
      .createCustomer()
      .then((response) => {
        if (response.statusCode === 201) {
          alert('Registration successful');
        } else {
          alert('Registration failed');
        }
      })
      .catch((error: Error) => {
        alert(error.message);
      });
  }

  public addEventSubmit(): void {
    this.registerForm.addEventListener('submit', this.handleSubmit.bind(this));
  }
}
