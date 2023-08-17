import JustValidate, { Rules } from 'just-validate';

class LoginFormValidation {
  public validateLoginFormFields(container: HTMLElement): void {
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
  }
}

export default LoginFormValidation;
