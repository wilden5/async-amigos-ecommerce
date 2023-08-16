import JustValidate, { Rules } from 'just-validate';

class RegistrationPageValidation {
  private isPostalCodeValid(countryValue: string, postalCodeValue: string): boolean {
    if (countryValue === 'US') {
      return /^\d{5}$/.test(postalCodeValue);
    }
    if (countryValue === 'CA') {
      return /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(postalCodeValue);
    }
    return true;
  }

  private getPostalCodeErrorMessage(countryValue: string): string {
    if (countryValue === 'US') {
      return 'Postal code should be 5 digits for USA';
    }
    if (countryValue === 'CA') {
      return 'Postal code should be in the format A1B 2C3 for Canada';
    }
    return 'Invalid postal code';
  }

  public performRegistrationFormValidation(container: HTMLElement): void {
    let countryValue: string;
    const validator = new JustValidate(container.querySelector('.register-form') as HTMLFormElement);
    validator
      .addField('.input-email', [
        {
          rule: Rules.Required,
        },
        {
          rule: Rules.Email,
        },
      ])
      .addField('.input-password', [
        {
          rule: Rules.Required,
        },
        {
          rule: Rules.StrongPassword,
        },
      ])
      .addField('.input-first-name', [
        {
          rule: Rules.Required,
        },
        {
          rule: Rules.MinLength,
          value: 1,
        },
        {
          rule: Rules.CustomRegexp,
          value: /^[A-Za-z\s]+$/,
          errorMessage: 'Must contain no special characters or numbers',
        },
      ])
      .addField('.input-last-name', [
        {
          rule: Rules.Required,
        },
        {
          rule: Rules.MinLength,
          value: 1,
        },
        {
          rule: Rules.CustomRegexp,
          value: /^[A-Za-z\s]+$/,
          errorMessage: 'Must contain no special characters or numbers',
        },
      ])
      .addField('.input-street', [
        {
          rule: Rules.Required,
        },
        {
          rule: Rules.MinLength,
          value: 1,
        },
      ])
      .addField('.input-city', [
        {
          rule: Rules.Required,
        },
        {
          rule: Rules.MinLength,
          value: 1,
        },
        {
          rule: Rules.CustomRegexp,
          value: /^[A-Za-z\s]+$/,
          errorMessage: 'Must contain no special characters or numbers',
        },
      ])
      .addField('.input-postal-code', [
        {
          rule: Rules.Required,
        },
        {
          validator: (value): boolean => {
            countryValue = (container.querySelector('.select-country') as HTMLInputElement).value;
            return this.isPostalCodeValid(countryValue, value as string);
          },
          errorMessage: (): string => this.getPostalCodeErrorMessage(countryValue),
        },
      ])
      .addField('.select-country', [
        {
          rule: Rules.Required,
        },
      ]);
  }
}

export default RegistrationPageValidation;
