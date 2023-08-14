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

    if (customer.addresses) {
      if (
        customer.addresses.some(
          (address) => !Constants.REGISTRATION_ADDRESS_PARTS.every((part) => address[part as keyof BaseAddress]),
        )
      ) {
        throw new Error(Constants.BACKEND_ADDRESS_VALIDATION_MESSAGE);
      }
    }
  }
}

export default RegistrationValidator;
