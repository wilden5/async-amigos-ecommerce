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
}

export default Constants;
