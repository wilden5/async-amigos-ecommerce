import { EmailHints, PasswordHints } from '../../../src/types/Enums';
import validatePassword from '../../../src/utils/ValidatePassword';
import validateEmail from '../../../src/utils/ValidateEmail';

describe('Validate Password Format: ', (): void => {
  it('should return LengthHint for a password less than 8 characters', (): void => {
    expect(validatePassword('Abc123')).toBe(PasswordHints.LengthHint);
  });

  it('should return UpperLettersHint for a password without uppercase letters', (): void => {
    expect(validatePassword('abc12345')).toBe(PasswordHints.UpperLettersHint);
  });

  it('should return LowerLettersHint for a password without lowercase letters', (): void => {
    expect(validatePassword('ABC12345')).toBe(PasswordHints.LowerLettersHint);
  });

  it('should return DigitsHint for a password without digits', (): void => {
    expect(validatePassword('Abcdefgh')).toBe(PasswordHints.DigitsHint);
  });

  it('should return SpecialCharsHint for a password without special characters', (): void => {
    expect(validatePassword('Abc12345')).toBe(PasswordHints.SpecialCharsHint);
  });

  it('should return true for a valid password', (): void => {
    expect(validatePassword('Abc12345!')).toBe(true);
  });

  it('should return SpacesHint for a password with spaces', (): void => {
    expect(validatePassword('Abc 12345')).toBe(PasswordHints.SpacesHint);
  });
});

describe('Validate Email Format: ', (): void => {
  it('should return EmailFormatHint for an invalid email format', (): void => {
    expect(validateEmail('invalid-email')).toBe(EmailHints.EmailFormatHint);
    expect(validateEmail('email@domain')).toBe(EmailHints.EmailFormatHint);
    expect(validateEmail('@domain.com')).toBe(EmailHints.EmailFormatHint);
    expect(validateEmail('email@.com')).toBe(EmailHints.EmailFormatHint);
  });

  it('should return true for a valid email format', (): void => {
    expect(validateEmail('valid@email.com')).toBe(true);
    expect(validateEmail('user.name@example.co.uk')).toBe(true);
  });
});

// /* eslint-disable @typescript-eslint/dot-notation */
// import LoginPage from "../../../src/pages/login-page/LoginPage";
//
// describe('LoginPage private methods', (): void => {
//   let loginPage: LoginPage;
//
//   beforeEach((): void => {
//     loginPage = new LoginPage();
//   });
//
//   it('validateEmail should return true for a valid email', (): void => {
//     const validEmail = 'test@example.com';
//     const result = loginPage['validateEmail'](validEmail);
//     expect(result).toBe(true);
//   });
//
//   it('validateEmail should return false for an invalid email', (): void => {
//     const invalidEmail = 'invalid-email';
//     const result = loginPage['validateEmail'](invalidEmail);
//     expect(result).toBe(false);
//   });
//
//   it('validatePassword should return true for a valid password', (): void => {
//     const validPassword = 'ValidPass123!';
//     const result = loginPage['validatePassword'](validPassword);
//     expect(result).toBe(true);
//   });
//
//   it('validatePassword should return false for an invalid password', (): void => {
//     const invalidPassword = 'invalid';
//     const result = loginPage['validatePassword'](invalidPassword);
//     expect(result).toBe(false);
//   });
// });
