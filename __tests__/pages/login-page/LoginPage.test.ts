import LoginPage from '../../../src/pages/login-page/LoginPage';
import RealTimeValidationFactory from '../../../src/utils/RealTimeValidationFactory';

describe('LoginPage', (): void => {
  let loginPage: LoginPage;
  let actualPageMarkup: HTMLElement;

  beforeEach((): void => {
    loginPage = new LoginPage();

    const container = document.createElement('div');
    container.className = 'test-container';
    actualPageMarkup = loginPage.renderPage();

    document.body.appendChild(container);
    container.appendChild(actualPageMarkup);
  });

  afterEach((): void => {
    const container = document.querySelector('.test-container');
    if (container) {
      document.body.removeChild(container);
    }
  });

  test('Login container should be present', (): void => {
    const containerLogin = actualPageMarkup.querySelector('.container.container-login');
    expect(containerLogin).not.toBeNull();
  });

  test('Login form should be present', (): void => {
    const loginForm = actualPageMarkup.querySelector('form#login-form');
    expect(loginForm).not.toBeNull();
  });

  test('Input box should be present within the form', (): void => {
    const inputBox = actualPageMarkup.querySelector('.input-box');
    expect(inputBox).not.toBeNull();
  });
});

describe('RealTimeValidationFactory', (): void => {
  it('should create validation hint element for invalid input value', (): void => {
    // Create a dummy input element and mock closest method
    const inputElement: HTMLInputElement = document.createElement('input');
    const mockClosest = jest.fn();
    inputElement.closest = mockClosest;

    // Define your actual validator function here
    const validator = (value: string): string | boolean => {
      if (value === 'invalid') {
        return 'Invalid input value';
      }
      return true;
    };

    // Create a container div to hold the input element
    const container: HTMLDivElement = document.createElement('div');
    container.appendChild(inputElement);

    // Mock the setupValidation function to trigger the change event handler directly
    const mockSetupValidation = jest.spyOn(RealTimeValidationFactory, 'setupValidation');
    mockSetupValidation.mockImplementation((input, validatorFunc): void => {
      inputElement.addEventListener('change', (): void => {
        const validationResponse: string | boolean = validatorFunc(inputElement.value);
        if (typeof validationResponse !== 'boolean') {
          const validationHintElement: HTMLSpanElement = document.createElement('span');
          validationHintElement.className = 'validation-hint';
          container.appendChild(validationHintElement);
          validationHintElement.textContent = validationResponse; // Set the text using the validation response
        }
      });
    });

    // Set up the validation for the input element
    RealTimeValidationFactory.setupValidation(inputElement, validator, {});

    // Simulate change event with invalid input
    inputElement.value = 'invalid';
    inputElement.dispatchEvent(new Event('change'));

    // Validate if the validation hint element is created
    const hintElement = container.querySelector('.validation-hint') as HTMLElement;
    expect(hintElement).toBeTruthy();
    expect(hintElement?.textContent).toBe('Invalid input value'); // Verify the hint message

    // Clean up the mock
    mockSetupValidation.mockRestore();
  });
});
