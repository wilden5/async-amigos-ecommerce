class Constants {
  static PAGE_CONTAINER_SELECTOR = 'page-content-container';

  static HEADER_CONTAINER_SELECTOR = 'header-container';

  static NAVIGATION_BAR_SELECTOR = 'navigation-bar';

  static LOCK_ICON_SELECTOR = '.icon-lock';

  static CLOSED_LOCK_ICON_MARKUP = '<i class="bx bxs-lock-alt"></i>';

  static OPENED_LOCK_ICON_MARKUP = '<i class="bx bxs-lock-open-alt"></i>';

  static HOME_PAGE_SELECTOR = 'home';

  static ACCOUNT_HAS_BEEN_CREATED = 'Your account has been created successfully!';

  static ACCOUNT_CREATION_ERROR = 'Something went wrong during registration process, please try again!';

  static TOAST_COLOR_RED = '#FF0000';

  static TOAST_COLOR_GREEN = '#00FF00';

  static BACKEND_GENERIC_VALIDATION_MESSAGE_REGISTRATION = 'field must be filled!';

  static BACKEND_FIRST_NAME_VALIDATION_MESSAGE = 'First name field cannot have any digits or special symbols!';

  static BACKEND_LAST_NAME_VALIDATION_MESSAGE = 'Last name field cannot have any digits or special symbols!';

  static BACKEND_ADDRESS_VALIDATION_MESSAGE = 'All parts of an address must be filled!';

  static REGISTRATION_REQUIRED_FIELDS = ['email', 'password', 'firstName', 'lastName', 'dateOfBirth', 'addresses'];

  static REGISTRATION_ADDRESS_PARTS = ['streetName', 'city', 'postalCode', 'country'];

  static FAILED_TO_FETCH_ERROR_MESSAGE = 'Failed to fetch';

  static LOGIN_REQUIRED_FIELDS = ['email', 'password'];

  static LOGIN_SUCCESS = 'You have successfully logged in. Welcome back';

  static LOGIN_ERROR = 'Invalid username or password. Please try again or register.';

  static POSTAL_CODE_ERROR_USA = 'Postal code should be 5 digits for USA';

  static POSTAL_CODE_ERROR_CANADA = 'Postal code should be in the format A1B 2C3 for Canada';

  static POSTAL_CODE_ERROR_GENERIC = 'Invalid postal code';

  static NO_NUMBERS_OR_SPECIAL_CHAR_ERROR = 'Must contain no special characters or numbers';

  static INVALID_AGE_ERROR = 'Age should be above 13 years old';

  static MIN_AGE_DATE = '2010-08-16';

  static INVALID_PASSWORD_ERROR_MESSAGE =
    'Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character';

  static INVALID_EMAIL_ERROR_MESSAGE = 'Email has invalid format';

  static SEPARATED_BILLING_ADDRESS_MARKUP = `<div class='billing-address'><div class="input-box">
          <span class="icon"><i class='bx bxs-city'></i></span>
          <input class='input-billing-city billing-part' type="text" name="b-city">
          <label for="b-city">Billing City</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bxs-traffic'></i></span>
          <input class='input-billing-street billing-part' type="text" name="b-street">
          <label for="b-street">Billing Street</label>
        </div>
        <div class="input-box">
          <span class="icon"><i class='bx bxs-building-house'></i></span>
          <input class='input-billing-postal-code billing-part' type="text" name="b-postalCode">
          <label for="b-postalCode">Billing Postal Code</label>
        </div>
        <div class="default-billing-address">
          <label for="default-bil-add">
            <input class='default-billing-address-option' type="checkbox" checked id="default-bil-add">Set entered billing address as a default one</input>
          </label>
        </div>
        </div>`;

  static BACKEND_STREET_VALIDATION_MESSAGE = 'Street: Must contain at least one character';

  static BACKEND_CITY_VALIDATION_MESSAGE =
    'City: Must contain at least one character and no special characters or numbers';

  static BACKEND_UNSUPPORTED_COUNTRY_MESSAGE = 'Unsupported country';
}

export default Constants;
