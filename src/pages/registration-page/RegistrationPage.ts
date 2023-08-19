import { ClientResponse, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import Constants from '../../utils/Constants';
import { CustomerRegistration } from '../../backend/registration/CustomerRegistration';
import TostifyHelper from '../../utils/TostifyHelper';
import RegistrationFormValidation from './RegistrationFormValidation';

class RegistrationPage extends Page {
  private REGISTRATION_PAGE_MARKUP = `
  <div class="container container-register">
    <div class="main-box register">
      <h2>Registration</h2>
      <div class="register">
          <p class='customer-message'>Already a Customer?<a href="#login" class="login-link">Login</a></p>
        </div>
      <form class="register-form">
        <div class="input-box">
          <span class="icon"><i class='bx bxs-envelope'></i></span>
            <input class='input-email' type="email" name="email">
            <label for="email">Email</label>
        </div>
        <div class="input-box">
          <span class="icon icon-lock"><i class='bx bxs-lock-alt'></i></span>
          <input class="input-password" type="password" autocomplete='reg-password' name="password">
          <label for="password">Password</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bxs-user'></i></span>
          <input class='input-first-name' type="text" name="firstName">
          <label for="firstName">First Name</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bxs-user'></i></span>
          <input class='input-last-name' type="text" name="lastName">
          <label for="lastName">Last Name</label>
        </div>
        <div class="input-box">
          <input class='input-date-of-birth' type="date" name="dob">
          <label for="dob">Date of Birth</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bx-globe'></i></span>
          <select class='select-country' name="country">
            <option value="" disabled selected>Select Country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
          <label for="country">Country</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bxs-city'></i></span>
          <input class='input-city address-part' type="text" name="city">
          <label for="city">City</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bxs-traffic'></i></span>
          <input class='input-street address-part' type="text" name="street">
          <label for="street">Street</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bxs-building-house'></i></span>
          <input class='input-postal-code address-part' type="text" name="postalCode">
          <label for="postalCode">Postal Code</label>
        </div>
        <div class="check">
          <label for="use-same-address">
            <input class='address-option' type="checkbox" checked id="use-same-address">Use the same address for both billing and shipping</input>
          </label>
        </div>
        <button class="main-btn" type="submit">Register me</button>
      </form>
    </div>
  </div>`;

  private REGISTRATION_FORM_VALIDATION: RegistrationFormValidation;

  constructor() {
    super(ProjectPages.Registration);
    this.REGISTRATION_FORM_VALIDATION = new RegistrationFormValidation();
  }

  private setBillingAddressAsSeparated(): void {
    const checkbox = this.CONTAINER.querySelector('.address-option') as HTMLInputElement;
    const acceptTermsContainer = this.CONTAINER.querySelector('.check') as HTMLDivElement;

    checkbox.addEventListener('change', () => {
      if (!checkbox.checked) {
        acceptTermsContainer.insertAdjacentHTML('afterend', Constants.SEPARATED_BILLING_ADDRESS_MARKUP);
      } else {
        (this.CONTAINER.querySelector('.billing-address') as HTMLDivElement).remove();
      }
    });
  }

  private handleRegistrationResponse(response: ClientResponse<CustomerSignInResult>): void {
    if (response.statusCode === 201) {
      TostifyHelper.showToast(Constants.ACCOUNT_HAS_BEEN_CREATED, Constants.TOAST_COLOR_GREEN);
    } else {
      TostifyHelper.showToast(Constants.ACCOUNT_CREATION_ERROR, Constants.TOAST_COLOR_RED);
    }
  }

  public submitRegistrationForm = (event: Event): void => {
    event.preventDefault();
    let customerData: CustomerDraft = {
      email: (this.CONTAINER.querySelector('input[name="email"]') as HTMLInputElement).value.trim(),
      password: (this.CONTAINER.querySelector('input[name="password"]') as HTMLInputElement).value.trim(),
      firstName: (this.CONTAINER.querySelector('input[name="firstName"]') as HTMLInputElement).value.trim(),
      lastName: (this.CONTAINER.querySelector('input[name="lastName"]') as HTMLInputElement).value.trim(),
      dateOfBirth: (this.CONTAINER.querySelector('input[name="dob"]') as HTMLInputElement).value.trim(),
      addresses: [
        {
          streetName: (this.CONTAINER.querySelector('input[name="street"]') as HTMLInputElement).value.trim(),
          city: (this.CONTAINER.querySelector('input[name="city"]') as HTMLInputElement).value.trim(),
          postalCode: (this.CONTAINER.querySelector('input[name="postalCode"]') as HTMLInputElement).value.trim(),
          country: (this.CONTAINER.querySelector('select[name="country"]') as HTMLSelectElement).value.trim(),
        },
      ],
    };

    if (this.CONTAINER.querySelector('.billing-address')) {
      const billingAddressData = {
        streetName: (this.CONTAINER.querySelector('input[name="b-street"]') as HTMLInputElement).value.trim(),
        city: (this.CONTAINER.querySelector('input[name="b-city"]') as HTMLInputElement).value.trim(),
        postalCode: (this.CONTAINER.querySelector('input[name="b-postalCode"]') as HTMLInputElement).value.trim(),
        country: (this.CONTAINER.querySelector('select[name="country"]') as HTMLSelectElement).value.trim(),
      };
      customerData.addresses?.push(billingAddressData);
      customerData = {
        ...customerData,
        shippingAddresses: [0],
        billingAddresses: [1],
      };
    } else {
      customerData = {
        ...customerData,
        billingAddresses: [0],
        shippingAddresses: [0],
      };
    }

    new CustomerRegistration(customerData)
      .createCustomer()
      .then((response) => {
        this.handleRegistrationResponse(response);
      })
      .catch((error: Error) => {
        const errorMessage =
          error.message === Constants.FAILED_TO_FETCH_ERROR_MESSAGE ? Constants.ACCOUNT_CREATION_ERROR : error.message;
        TostifyHelper.showToast(errorMessage, Constants.TOAST_COLOR_RED);
      });
  };

  public manageRegistrationFormEventListener = (add: boolean): void => {
    const form = this.CONTAINER.querySelector('.register-form') as HTMLFormElement;

    if (add) {
      form.addEventListener('submit', this.submitRegistrationForm);
    } else {
      form.removeEventListener('submit', this.submitRegistrationForm);
    }
  };

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.REGISTRATION_PAGE_MARKUP;
    this.REGISTRATION_FORM_VALIDATION.validateRegistrationFormFields(
      this.CONTAINER,
      this.manageRegistrationFormEventListener,
    );
    this.setBillingAddressAsSeparated();
    return this.CONTAINER;
  }
}

export default RegistrationPage;
