import JustValidate from 'just-validate';
import { Rules } from '../../types/Enums';

class LoginFormValidation {
  public validateLoginFormFields(container: HTMLElement, callback: (add: boolean) => void): void {
    let validationResult;
    const LOGIN_FORM = container.querySelector('#login-form') as HTMLFormElement;
    const ValidationConfig = {
      validateBeforeSubmitting: true,
      focusInvalidField: true,
      testingMode: true,
      errorFieldStyle: {
        color: '#f70303',
        borderBottom: '2px solid #f70303',
      },
    };

    const validator = new JustValidate(LOGIN_FORM, ValidationConfig);
    validator
      .addField('.input-email', [{ rule: Rules.Required }, { rule: Rules.Email }])
      .addField('.input-password', [{ rule: Rules.Required }, { rule: Rules.StrongPassword }]);

    container.querySelectorAll('.input-box').forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        validationResult = validator.isValid;

        if (validationResult) {
          callback(true);
        } else {
          callback(false);
        }
      });
    });
  }
}

export default LoginFormValidation;
