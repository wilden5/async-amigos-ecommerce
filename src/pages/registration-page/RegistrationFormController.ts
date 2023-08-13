import { ClientResponse, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import Toastify from 'toastify-js';
import { CustomerRegistration } from '../../backend/registration/customer-registration';
import Constants from '../../utils/Constants';

export class RegistrationFormController {
  private REGISTER_FORM: HTMLElement;

  private REGISTER_FORM_ELEMENTS: {
    [key: string]: HTMLInputElement | HTMLSelectElement;
  };

  constructor(registerForm: HTMLFormElement) {
    this.REGISTER_FORM = registerForm;
    this.REGISTER_FORM_ELEMENTS = {
      EMAIL_INPUT: this.REGISTER_FORM.querySelector('input[name="email"]') as HTMLInputElement,
      PASSWORD_INPUT: this.REGISTER_FORM.querySelector('input[name="password"]') as HTMLInputElement,
      FIRST_NAME_INPUT: this.REGISTER_FORM.querySelector('input[name="firstName"]') as HTMLInputElement,
      LAST_NAME_INPUT: this.REGISTER_FORM.querySelector('input[name="lastName"]') as HTMLInputElement,
      DOB_INPUT: this.REGISTER_FORM.querySelector('input[name="dob"]') as HTMLInputElement,
      STREET_INPUT: this.REGISTER_FORM.querySelector('input[name="street"]') as HTMLInputElement,
      CITY_INPUT: this.REGISTER_FORM.querySelector('input[name="city"]') as HTMLInputElement,
      POSTAL_CODE_INPUT: this.REGISTER_FORM.querySelector('input[name="postalCode"]') as HTMLInputElement,
      COUNTRY_SELECT: this.REGISTER_FORM.querySelector('select[name="country"]') as HTMLSelectElement,
      ACCEPT_TERMS_CHECKBOX: this.REGISTER_FORM.querySelector('input[name="acceptTerms"]') as HTMLInputElement,
    };
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

  private handleRegistrationFormSubmit(event: Event): void {
    event.preventDefault();

    const customerData: CustomerDraft = {
      email: this.REGISTER_FORM_ELEMENTS.EMAIL_INPUT.value.trim(),
      password: this.REGISTER_FORM_ELEMENTS.PASSWORD_INPUT.value.trim(),
      firstName: this.REGISTER_FORM_ELEMENTS.FIRST_NAME_INPUT.value.trim(),
      lastName: this.REGISTER_FORM_ELEMENTS.LAST_NAME_INPUT.value.trim(),
      dateOfBirth: this.REGISTER_FORM_ELEMENTS.DOB_INPUT.value.trim(),
      addresses: [
        {
          streetName: this.REGISTER_FORM_ELEMENTS.STREET_INPUT.value.trim(),
          city: this.REGISTER_FORM_ELEMENTS.CITY_INPUT.value.trim(),
          postalCode: this.REGISTER_FORM_ELEMENTS.POSTAL_CODE_INPUT.value.trim(),
          country: this.REGISTER_FORM_ELEMENTS.COUNTRY_SELECT.value.trim(),
        },
      ],
    };

    new CustomerRegistration(customerData)
      .createCustomer()
      .then((response) => {
        this.handleRegistrationResponse(response);
      })
      .catch((error: Error) => {
        const errorMessage =
          error.message === Constants.FAILED_TO_FETCH_ERROR_MESSAGE ? Constants.ACCOUNT_CREATION_ERROR : error.message;
        this.showToast(errorMessage, Constants.TOAST_COLOR_RED);
      });
  }

  public addEventSubmit(): void {
    this.REGISTER_FORM.addEventListener('submit', this.handleRegistrationFormSubmit.bind(this));
  }
}
