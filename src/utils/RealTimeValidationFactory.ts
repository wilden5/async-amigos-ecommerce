// import EmailValidator from '../../utils/ValidateEmail';
// import PasswordValidator from '../../utils/ValidatePassword';

class RealTimeValidationFactory {
  static setupValidation(inputElement: HTMLInputElement, validator: (value: string) => string | boolean): void {
    inputElement.addEventListener('change', (): void => {
      const { value } = inputElement;
      const validationResponse: string | boolean = validator(value);

      if (typeof validationResponse === 'boolean') {
        console.log('Everything is fine');
      } else {
        console.log(validationResponse); // Print the validation hint
      }
    });
  }
}

export default RealTimeValidationFactory;
