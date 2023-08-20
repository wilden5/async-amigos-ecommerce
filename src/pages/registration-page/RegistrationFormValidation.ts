import JustValidate from 'just-validate';
import JustValidatePluginDate from 'just-validate-plugin-date';
import Constants from '../../utils/Constants';
import { Rules } from '../../types/Enums';

class RegistrationFormValidation {
  private canada = 'CA';

  private USA = 'US';

  private isPostalCodeValid(countryValue: string, postalCodeValue: string): boolean {
    if (countryValue === this.USA) {
      return /^\d{5}$/.test(postalCodeValue);
    }
    if (countryValue === this.canada) {
      return /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(postalCodeValue);
    }
    return true;
  }

  private getPostalCodeErrorMessage(countryValue: string): string {
    if (countryValue === this.USA) {
      return Constants.POSTAL_CODE_ERROR_USA;
    }
    if (countryValue === this.canada) {
      return Constants.POSTAL_CODE_ERROR_CANADA;
    }
    return Constants.POSTAL_CODE_ERROR_GENERIC;
  }

  public validateRegistrationFormFields(container: HTMLElement, callback: (add: boolean) => void): void {
    let countryValue: string;
    let validationResult;
    const validator = new JustValidate(container.querySelector('.register-form') as HTMLFormElement, {
      validateBeforeSubmitting: true,
      focusInvalidField: true,
      testingMode: true,
    });
    // added second instance since plugin-date is conflicting with option "validateBeforeSubmitting: true"
    const validator2 = new JustValidate(container.querySelector('.register-form') as HTMLFormElement);
    validator
      .addField('.input-email', [{ rule: Rules.Required }, { rule: Rules.Email }])
      .addField('.input-password', [{ rule: Rules.Required }, { rule: Rules.StrongPassword }])
      .addField('.input-first-name', [
        { rule: Rules.Required },
        { rule: Rules.MinLength, value: 1 },
        {
          rule: Rules.CustomRegexp,
          value: /^[A-Za-z\s]+$/,
          errorMessage: Constants.NO_NUMBERS_OR_SPECIAL_CHAR_ERROR,
        },
      ])
      .addField('.input-last-name', [
        { rule: Rules.Required },
        { rule: Rules.MinLength, value: 1 },
        {
          rule: Rules.CustomRegexp,
          value: /^[A-Za-z\s]+$/,
          errorMessage: Constants.NO_NUMBERS_OR_SPECIAL_CHAR_ERROR,
        },
      ])
      .addField('.input-street', [{ rule: Rules.Required }, { rule: Rules.MinLength, value: 1 }])
      .addField('.input-city', [
        { rule: Rules.Required },
        { rule: Rules.MinLength, value: 1 },
        {
          rule: Rules.CustomRegexp,
          value: /^[A-Za-z\s]+$/,
          errorMessage: Constants.NO_NUMBERS_OR_SPECIAL_CHAR_ERROR,
        },
      ])
      .addField('.input-postal-code', [
        { rule: Rules.Required },
        {
          validator: (value): boolean => {
            countryValue = (container.querySelector('.select-country') as HTMLInputElement).value;
            return this.isPostalCodeValid(countryValue, value as string);
          },
          errorMessage: (): string => this.getPostalCodeErrorMessage(countryValue),
        },
      ])
      .addField('.select-country', [{ rule: Rules.Required }]);
    validator2.addField('.input-date-of-birth', [
      {
        plugin: JustValidatePluginDate(() => ({ required: true, isBefore: Constants.MIN_AGE_DATE })),
        errorMessage: Constants.INVALID_AGE_ERROR,
      },
    ]);

    container.querySelectorAll('.input-box').forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        validationResult = validator.isValid;

        if (validationResult) {
          const checkbox = container.querySelector('.accept-terms') as HTMLInputElement;
          const submitButton = container.querySelector('.main-btn') as HTMLButtonElement;
          submitButton.disabled = !checkbox.checked;
          callback(true);
        } else {
          callback(false);
        }
      });
    });
  }
}

export default RegistrationFormValidation;
