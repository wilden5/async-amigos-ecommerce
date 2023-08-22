import {
  BaseAddress,
  ClientResponse,
  CustomerDraft,
  CustomerSignin,
  CustomerSignInResult,
} from '@commercetools/platform-sdk';
import Page from '../../components/templates/Page';
import { ProjectPages } from '../../types/Enums';
import Constants from '../../utils/Constants';
import { CustomerRegistration } from '../../backend/registration/CustomerRegistration';
import TostifyHelper from '../../utils/TostifyHelper';
import RegistrationFormValidation from './RegistrationFormValidation';
import DOMHelpers from '../../utils/DOMHelpers';
import LocalStorage from '../../utils/LocalStorage';
import { CustomerLogin } from '../../backend/login/CustomerLogin';

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
        <div class="default-address">
          <label for="default-add" title="If one address entered, same address will be set as default for both shipping and billing">
            <input class='default-address-option' type="checkbox" checked id="default-add">Set entered address as a default one</input>
          </label>
        </div>
        <div class="check">
          <label for="use-same-address">
            <input class='address-option' type="checkbox" checked id="use-same-address">Use the same address for both billing and shipping</input>
          </label>
        </div>
        <button class="main-btn" type="submit" disabled>Register me</button>
      </form>
    </div>
  </div>`;

  private REGISTRATION_FORM_VALIDATION: RegistrationFormValidation;

  private LOCAL_STORAGE: LocalStorage;

  constructor() {
    super(ProjectPages.Registration);
    this.REGISTRATION_FORM_VALIDATION = new RegistrationFormValidation();
    this.LOCAL_STORAGE = new LocalStorage();
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
      this.LOCAL_STORAGE.setLocalStorageItem(Constants.SUCCESSFUL_REGISTRATION_LOCAL_STORAGE_KEY, 'true');
      TostifyHelper.showToast(Constants.ACCOUNT_HAS_BEEN_CREATED, Constants.TOAST_COLOR_GREEN);
      this.redirectUserToHomePage();
    } else {
      TostifyHelper.showToast(Constants.ACCOUNT_CREATION_ERROR, Constants.TOAST_COLOR_RED);
    }
  }

  private redirectUserToHomePage(): void {
    const loginData: CustomerSignin = {
      email: (this.CONTAINER.querySelector('.input-email') as HTMLInputElement).value,
      password: (this.CONTAINER.querySelector('.input-password') as HTMLInputElement).value,
    };

    if (this.LOCAL_STORAGE.isLocalStorageItemExists(Constants.SUCCESSFUL_REGISTRATION_LOCAL_STORAGE_KEY)) {
      new CustomerLogin(loginData)
        .signIn()
        .then(() => {
          window.location.href = '#';
        })
        .catch((error: Error): void => {
          const errorMessage: string =
            error.message === Constants.FAILED_TO_FETCH_ERROR_MESSAGE ? Constants.LOGIN_ERROR : error.message;
          TostifyHelper.showToast(errorMessage, Constants.TOAST_COLOR_RED);
        });
    }
  }

  private getInputElementValue(selector: string): string {
    const inputElement = this.CONTAINER.querySelector(selector) as HTMLInputElement;
    return inputElement ? inputElement.value.trim() : '';
  }

  private getSelectElementValue(selector: string): string {
    const selectElement = this.CONTAINER.querySelector(selector) as HTMLSelectElement;
    return selectElement ? selectElement.value.trim() : '';
  }

  private collectAddressData(prefix: string): BaseAddress {
    return {
      streetName: this.getInputElementValue(`input[name="${prefix}street"]`),
      city: this.getInputElementValue(`input[name="${prefix}city"]`),
      postalCode: this.getInputElementValue(`input[name="${prefix}postalCode"]`),
      country: this.getSelectElementValue(`select[name="country"]`),
    };
  }

  private collectCustomerData(): CustomerDraft {
    let customerData: CustomerDraft = {
      email: this.getInputElementValue('input[name="email"]'),
      password: this.getInputElementValue('input[name="password"]'),
      firstName: this.getInputElementValue('input[name="firstName"]'),
      lastName: this.getInputElementValue('input[name="lastName"]'),
      dateOfBirth: this.getInputElementValue('input[name="dob"]'),
      addresses: [this.collectAddressData('')], // we don't add any prefix since it's for first set of fields
    };

    if (this.CONTAINER.querySelector('.billing-address')) {
      const billingAddressData = this.collectAddressData('b-');
      customerData.addresses?.push(billingAddressData);
      customerData = {
        ...customerData,
        shippingAddresses: [0],
        billingAddresses: [1],
      };

      if ((this.CONTAINER.querySelector('.default-billing-address-option') as HTMLInputElement).checked) {
        customerData = {
          ...customerData,
          defaultBillingAddress: 1,
        };
      }
      if ((this.CONTAINER.querySelector('.default-address-option') as HTMLInputElement).checked) {
        customerData = {
          ...customerData,
          defaultShippingAddress: 0,
        };
      }
    } else {
      customerData = {
        ...customerData,
        billingAddresses: [0],
        shippingAddresses: [0],
      };
      if ((this.CONTAINER.querySelector('.default-address-option') as HTMLInputElement).checked) {
        customerData = {
          ...customerData,
          defaultShippingAddress: 0,
          defaultBillingAddress: 0,
        };
      }
    }
    return customerData;
  }

  public submitRegistrationForm = (event: Event): void => {
    event.preventDefault();
    const customer: CustomerDraft = this.collectCustomerData();

    new CustomerRegistration(customer)
      .createCustomer()
      .then((response): void => {
        this.handleRegistrationResponse(response);
      })
      .catch((error: Error): void => {
        const errorMessage: string =
          error.message === Constants.FAILED_TO_FETCH_ERROR_MESSAGE ? Constants.ACCOUNT_CREATION_ERROR : error.message;
        TostifyHelper.showToast(errorMessage, Constants.TOAST_COLOR_RED);
      });
  };

  public manageRegistrationFormEventListener = (add: boolean): void => {
    const form = this.CONTAINER.querySelector('.register-form') as HTMLFormElement;
    const mainButton = this.CONTAINER.querySelector('.main-btn') as HTMLButtonElement;

    if (add) {
      form.addEventListener('submit', this.submitRegistrationForm);
      mainButton.disabled = false;
    } else {
      form.removeEventListener('submit', this.submitRegistrationForm);
      mainButton.disabled = true;
    }
  };

  private handleLockIconClickRegistrationPage(): void {
    const lockIcon = this.CONTAINER.querySelector(Constants.LOCK_ICON_SELECTOR) as HTMLElement;

    lockIcon.addEventListener('click', () => {
      DOMHelpers.showEnteredPassword(this.CONTAINER);
    });
  }

  public renderPage(): HTMLElement {
    this.CONTAINER.innerHTML = this.REGISTRATION_PAGE_MARKUP;
    this.REGISTRATION_FORM_VALIDATION.validateRegistrationFormFields(
      this.CONTAINER,
      this.manageRegistrationFormEventListener,
    );
    this.setBillingAddressAsSeparated();
    this.handleLockIconClickRegistrationPage();
    return this.CONTAINER;
  }
}

export default RegistrationPage;
