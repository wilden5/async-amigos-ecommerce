import TostifyHelper from '../../utils/TostifyHelper';
import Constants from '../../utils/Constants';

class Validator {
  static validateAddress(country: string, city: string, street: string, zip: string): boolean {
    if (
      country.trim() === '' ||
      city.trim() === '' ||
      street.trim() === '' ||
      zip.trim() === '' ||
      city.length > 50 ||
      street.length > 50
    ) {
      TostifyHelper.showToast(
        'Please fill in all address fields and limit each field to 50 characters',
        Constants.TOAST_COLOR_RED,
      );
      return false;
    }

    const errors: string[] = [];

    if (!/^[a-zA-Z\s'-]+$/.test(city)) {
      errors.push('City name contains invalid characters');
    }

    if (country === 'US' && zip.length !== 5) {
      errors.push('ZIP code must be 5 digits for the United States');
    }

    if (country === 'CA' && !/^[A-Z]\d[A-Z] \d[A-Z]\d$/.test(zip)) {
      errors.push('Canadian ZIP code must have the format A1A 1A1');
    }

    if (!/^[0-9A-Za-z\s.,;:?!'-~]+(-[0-9A-Za-z\s.,;:?!'-~]+)?$/.test(street)) {
      errors.push('Street name contains invalid characters or format');
    }

    if (errors.length > 0) {
      const errorMessage = errors.join('\n');
      TostifyHelper.showToast(errorMessage, Constants.TOAST_COLOR_RED);
      return false;
    }

    return true;
  }

  static validatePassword(currentPassword: string, newPassword: string): boolean {
    if (currentPassword.trim() === '') {
      TostifyHelper.showToast('Please enter your current password', Constants.TOAST_COLOR_RED);
      return false;
    }

    if (newPassword.trim() === '') {
      TostifyHelper.showToast('Please enter a new password', Constants.TOAST_COLOR_RED);
      return false;
    }

    if (currentPassword.length < 8) {
      TostifyHelper.showToast('Your current password must be at least 8 characters long', Constants.TOAST_COLOR_RED);
      return false;
    }

    if (newPassword.length < 8) {
      TostifyHelper.showToast('Password must be at least 8 characters long', Constants.TOAST_COLOR_RED);
      return false;
    }

    if (currentPassword === newPassword) {
      TostifyHelper.showToast('Your new password must not be the same as your old password', Constants.TOAST_COLOR_RED);
      return false;
    }

    const errors: string[] = [];

    if (!/[A-Z]/.test(newPassword)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(newPassword)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(newPassword)) {
      errors.push('Password must contain at least one digit');
    }

    if (!/[!@$%&*?]/.test(newPassword)) {
      errors.push('Password must contain at least one special character: !@$%&*?');
    }

    if (errors.length > 0) {
      const errorMessage = errors.join('\n');
      TostifyHelper.showToast(errorMessage, Constants.TOAST_COLOR_RED);
      return false;
    }

    return true;
  }

  static validatePersonalInfo(firstName: string, lastName: string, dateOfBirth: string, email: string): boolean {
    const namePattern = /^[A-Za-z]+$/;
    const dateOfBirthPattern = /^\d{4}-\d{2}-\d{2}$/;
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

    const isFirstNameValid = namePattern.test(firstName);
    const isLastNameValid = namePattern.test(lastName);
    const isDateOfBirthValid = dateOfBirthPattern.test(dateOfBirth);
    const isEmailValid = emailPattern.test(email);

    const errorMessages: string[] = [];

    if (!isFirstNameValid) {
      errorMessages.push('The name contains invalid characters');
    }

    if (!isLastNameValid) {
      errorMessages.push('Last name contains invalid characters');
    }

    if (!isDateOfBirthValid) {
      errorMessages.push('The date of birth is in the wrong format');
    } else {
      const dateParts = dateOfBirth.split('-');
      const yearOfBirth = parseInt(dateParts[0], 10);
      if (yearOfBirth < 1900 || yearOfBirth > 2010) {
        errorMessages.push('Year of birth must be between 1900 and 2010');
      }
    }

    if (!isEmailValid) {
      errorMessages.push('Email is not in the correct format');
    }

    if (errorMessages.length > 0) {
      const errorMessage = errorMessages.join('\n');
      TostifyHelper.showToast(errorMessage, Constants.TOAST_COLOR_RED);
    }

    return errorMessages.length > 0;
  }
}

export default Validator;
