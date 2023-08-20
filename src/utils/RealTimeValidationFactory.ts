class RealTimeValidationFactory {
  static setupValidation(
    inputElement: HTMLInputElement,
    validator: (value: string) => string | boolean,
    validationHints: Record<string, string>,
  ): void {
    const inputBox = inputElement.closest('.input-box') as HTMLInputElement;
    let validationHintElement: HTMLSpanElement | null = null;

    inputElement.addEventListener('change', (): void => {
      const { value } = inputElement;
      const validationResponse: string | boolean = validator(value);

      if (!validationHintElement) {
        validationHintElement = document.createElement('span');
        validationHintElement.className = 'validation-hint';
        inputBox.appendChild(validationHintElement);
      }

      if (typeof validationResponse === 'boolean') {
        validationHintElement.style.display = 'none';
      } else {
        validationHintElement.innerText = validationHints[validationResponse];
        validationHintElement.style.display = 'block';
      }
    });
  }
}

export default RealTimeValidationFactory;
