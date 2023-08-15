class RegistrationPageValidation {
  static isPostalCodeValid(countryValue: string, postalCodeValue: string): boolean {
    if (countryValue === 'US') {
      return /^\d{5}$/.test(postalCodeValue);
    }
    if (countryValue === 'CA') {
      return /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(postalCodeValue);
    }
    return true;
  }

  static getPostalCodeErrorMessage(countryValue: string): string {
    if (countryValue === 'US') {
      return 'Postal code should be 5 digits for USA';
    }
    if (countryValue === 'CA') {
      return 'Postal code should be in the format A1B 2C3 for Canada';
    }
    return 'Invalid postal code';
  }
}

export default RegistrationPageValidation;
