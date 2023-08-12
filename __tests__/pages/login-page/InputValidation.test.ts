import { EmailHints, PasswordHints } from '../../../src/types/Enums';
import PasswordValidator from '../../../src/utils/ValidatePassword';
import EmailValidator from '../../../src/utils/ValidateEmail';

describe('Validate Password Format: ', (): void => {
  it('should return LengthHint for a password less than 8 characters', (): void => {
    expect(PasswordValidator.validate('Abc123')).toBe(PasswordHints.LengthHint);
  });

  it('should return UpperLettersHint for a password without uppercase letters', (): void => {
    expect(PasswordValidator.validate('abc12345')).toBe(PasswordHints.UpperLettersHint);
  });

  it('should return LowerLettersHint for a password without lowercase letters', (): void => {
    expect(PasswordValidator.validate('ABC12345')).toBe(PasswordHints.LowerLettersHint);
  });

  it('should return DigitsHint for a password without digits', (): void => {
    expect(PasswordValidator.validate('Abcdefgh')).toBe(PasswordHints.DigitsHint);
  });

  it('should return SpecialCharsHint for a password without special characters', (): void => {
    expect(PasswordValidator.validate('Abc12345')).toBe(PasswordHints.SpecialCharsHint);
  });

  it('should return true for a valid password', (): void => {
    expect(PasswordValidator.validate('Abc12345!')).toBe(true);
  });

  it('should return SpacesHint for a password with spaces', (): void => {
    expect(PasswordValidator.validate('Abc 12345')).toBe(PasswordHints.SpacesHint);
  });
});

describe('Validate Email Format: ', (): void => {
  it('should return EmailFormatHint for an invalid email format', (): void => {
    expect(EmailValidator.validate('invalid-email')).toBe(EmailHints.EmailFormatHint);
    expect(EmailValidator.validate('email@domain')).toBe(EmailHints.EmailFormatHint);
    expect(EmailValidator.validate('@domain.com')).toBe(EmailHints.EmailFormatHint);
    expect(EmailValidator.validate('email@.com')).toBe(EmailHints.EmailFormatHint);
  });

  it('should return true for a valid email format', (): void => {
    expect(EmailValidator.validate('valid@email.com')).toBe(true);
    expect(EmailValidator.validate('user.name@example.co.uk')).toBe(true);
  });
});
