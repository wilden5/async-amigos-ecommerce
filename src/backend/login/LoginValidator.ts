import { CustomerSignin } from '@commercetools/platform-sdk';
import Constants from '../../utils/Constants';

class LoginValidator {
  static async validateCustomerData(customer: CustomerSignin): Promise<void> {
    const missingField = Constants.LOGIN_REQUIRED_FIELDS.find(
      (fieldName) => !customer[fieldName as keyof CustomerSignin],
    );

    if (missingField) {
      throw new Error(`${missingField} ${Constants.BACKEND_GENERIC_VALIDATION_MESSAGE_REGISTRATION}`);
    }
  }
}

export default LoginValidator;
