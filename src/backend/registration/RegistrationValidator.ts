import { BaseAddress, CustomerDraft } from '@commercetools/platform-sdk';
import Constants from '../../utils/Constants';

class RegistrationValidator {
  static async validateCustomerData(customer: CustomerDraft): Promise<void> {
    const missingField = Constants.REGISTRATION_REQUIRED_FIELDS.find(
      (fieldName) => !customer[fieldName as keyof CustomerDraft],
    );

    if (missingField) {
      throw new Error(`${missingField} ${Constants.BACKEND_GENERIC_VALIDATION_MESSAGE_REGISTRATION}`);
    }

    if (customer.firstName && /\d/.test(customer.firstName)) {
      throw new Error(Constants.BACKEND_FIRST_NAME_VALIDATION_MESSAGE);
    }

    if (customer.lastName && /\d/.test(customer.lastName)) {
      throw new Error(Constants.BACKEND_LAST_NAME_VALIDATION_MESSAGE);
    }

    if (customer.dateOfBirth) {
      const minAgeDate = new Date(Constants.MIN_AGE_DATE);
      const birthDate = new Date(customer.dateOfBirth);

      if (birthDate > minAgeDate) {
        throw new Error(Constants.INVALID_AGE_ERROR);
      }
    }

    if (customer.addresses) {
      if (
        customer.addresses.some(
          (address) => !Constants.REGISTRATION_ADDRESS_PARTS.every((part) => address[part as keyof BaseAddress]),
        )
      ) {
        throw new Error(Constants.BACKEND_ADDRESS_VALIDATION_MESSAGE);
      }

      customer.addresses.forEach((address) => {
        if (!address.streetName || !/.+/.test(address.streetName)) {
          throw new Error(Constants.BACKEND_STREET_VALIDATION_MESSAGE);
        }

        if (!address.city || !/^[A-Za-z ]+$/.test(address.city)) {
          throw new Error(Constants.BACKEND_CITY_VALIDATION_MESSAGE);
        }

        const { country } = address;
        let postalCodePattern: RegExp;
        let postalCodeErrorMessage: string;

        if (country === 'US') {
          postalCodePattern = /^\d{5}(?:-\d{4})?$/;
          postalCodeErrorMessage = Constants.POSTAL_CODE_ERROR_USA;
        } else if (country === 'CA') {
          postalCodePattern = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
          postalCodeErrorMessage = Constants.POSTAL_CODE_ERROR_CANADA;
        } else {
          throw new Error(Constants.BACKEND_UNSUPPORTED_COUNTRY_MESSAGE);
        }

        if (!postalCodePattern.test(address.postalCode as string)) {
          throw new Error(postalCodeErrorMessage);
        }
      });
    }
  }
}

export default RegistrationValidator;
