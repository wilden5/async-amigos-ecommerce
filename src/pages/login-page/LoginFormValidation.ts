import JustValidate from 'just-validate';
import { Rules } from '../../types/Enums';

class LoginFormValidation {
  public validateLoginFormFields(container: HTMLElement, callback: (add: boolean) => void): void {
    const mainButton = container.querySelector('.main-btn') as HTMLButtonElement;
    let validationResult;
    const LOGIN_FORM = container.querySelector('#login-form') as HTMLFormElement;
    const ValidationConfig = {
      validateBeforeSubmitting: true,
      focusInvalidField: true,
      testingMode: true,
    };

    const validator = new JustValidate(LOGIN_FORM, ValidationConfig);
    validator
      .addField('.input-email', [{ rule: Rules.Required }, { rule: Rules.Email }])
      .addField('.input-password', [{ rule: Rules.Required }, { rule: Rules.StrongPassword }]);

    container.querySelectorAll('.input-box').forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        validationResult = validator.isValid;

        if (validationResult) {
          mainButton.disabled = false;
          callback(true);
        } else {
          mainButton.disabled = true;
          callback(false);
        }
      });
    });
  }
}

export default LoginFormValidation;
